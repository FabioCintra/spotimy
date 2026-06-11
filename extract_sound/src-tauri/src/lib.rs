use std::process::Command;

#[tauri::command]
fn extract_sound(url: String) -> Result<String,String> {
    let output = Command::new("python")
        .arg("scripts/extractor.py")
        .arg(url)
        .arg("C:\\Users\\Fabio\\Downloads")
        .output()
        .map_err(|e| e.to_string())?; // ? -> propaga o erro caso ele ocorra!

     
    if output.status.success() {
        Ok("Áudio extraído com sucesso!".to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![extract_sound])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


