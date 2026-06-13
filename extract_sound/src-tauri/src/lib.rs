use tauri::Manager;
use reqwest::Client;
use tokio::io::AsyncWriteExt;
use percent_encoding::percent_decode_str;
use std::fs;

#[tauri::command]
async fn extract_sound(app: tauri::AppHandle, url: String) -> Result<String, String> {
    // 1. Define onde salvar o arquivo
    let download_dir = app.path().download_dir().map_err(|e| e.to_string())?;
    let download_path = download_dir.join("spotimy");

    // Cria a pasta se não existir
    if !download_path.exists() {
        fs::create_dir_all(&download_path).map_err(|e| format!("Erro ao criar pasta: {}", e))?;
    }

    // 2. URL do seu servidor Python
    let backend_url = format!("http://localhost:8000/download?url={}", url);
    let client = Client::new();

    // 3. Faz a requisição para o servidor Python
    let mut response = client.get(&backend_url)
        .send()
        .await
        .map_err(|e| format!("Erro ao conectar no servidor Python: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("O servidor Python retornou erro: {}", response.status()));
    }

    // 4. Extração e Decodificação do Nome do Arquivo
    let header_value = response
        .headers()
        .get("content-disposition")
        .and_then(|h| h.to_str().ok())
        .unwrap_or("");

    let mut raw_filename = "musica_baixada.mp3".to_string();

    // Tenta capturar o filename (formato simples ou extendido utf-8)
    if header_value.contains("filename*=") {
        if let Some(part) = header_value.split("filename*=utf-8''").last() {
            raw_filename = part.to_string();
        }
    } else if header_value.contains("filename=") {
        if let Some(part) = header_value.split("filename=").last() {
            raw_filename = part.trim_matches('"').to_string();
        }
    }

    // Decodifica %20, %C3, etc para caracteres normais
    let decoded_filename = percent_decode_str(&raw_filename)
        .decode_utf8_lossy()
        .to_string();

    // 5. LIMPEZA FINAL (Remove caracteres proibidos do Windows)
    let safe_filename = decoded_filename.chars()
        .map(|c| match c {
            '\\' | '/' | ':' | '*' | '?' | '"' | '<' | '>' | '|' => '_',
            _ => c,
        })
        .collect::<String>();

    let mut final_path = download_path.clone();
    final_path.push(&safe_filename);

    // 6. Cria o arquivo e salva os dados
    let mut file = tokio::fs::File::create(&final_path).await
        .map_err(|e| format!("Erro ao criar arquivo no disco: {}. Nome tentado: {}", e, safe_filename))?;

    while let Some(chunk) = response.chunk().await.map_err(|e| e.to_string())? {
        file.write_all(&chunk).await.map_err(|e| e.to_string())?;
    }

    Ok(format!("Download concluído: {}", safe_filename))
}

#[tauri::command]
async fn get_musics(app: tauri::AppHandle) -> Result<Vec<String>, String> {
    let download_dir = app.path().download_dir().map_err(|e| e.to_string())?;
    let folder_path = download_dir.join("spotimy");

    let entries = fs::read_dir(folder_path)
        .map_err(|e| format!("Não foi possível ler a pasta: {}", e))?;

    let mut songs = Vec::new();

    for entry in entries {
        if let Ok(entry) = entry {
            let path = entry.path();
            if path.is_file() && path.extension().and_then(|s| s.to_str()) == Some("mp3") {
                if let Some(file_name) = path.file_name().and_then(|s| s.to_str()) {
                    songs.push(file_name.to_string());
                }
            }
        }
    }

    Ok(songs)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![extract_sound, get_musics])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
