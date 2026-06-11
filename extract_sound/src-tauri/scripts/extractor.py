import sys
import os
import subprocess

def extract_sound_yt(url, path="/downloads"):
    os.makedirs(path, exist_ok=True)

    command = [
        "yt-dlp",
        "-x",
        "--audio-format", "mp3",
        "--audio-quality", "192K",
        "-o", f"{path}/%(title)s.%(ext)s",
        url
    ]

    subprocess.run(command, check=True)

if __name__ == "__main__":
    url = sys.argv[1]
    path = sys.argv[2] if len(sys.argv) > 2 else "sounds"
    extract_sound_yt(url, path)