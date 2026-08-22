@echo off
set SCRIPT_DIR=%~dp0
set TARGET=%SCRIPT_DIR%..\..\cities\data\LSY
set VERSION=1.30.0
echo [Lyon Mod] Copying data files to cities\data\LSY...
if not exist "%TARGET%" mkdir "%TARGET%"
copy /Y "%SCRIPT_DIR%data\LSY\*" "%TARGET%\" >nul
echo [Lyon Mod] Data files copied successfully.
if not exist "%SCRIPT_DIR%pmtiles.exe" (
    echo [Lyon Mod] Downloading pmtiles.exe...
    curl -L -f -o "%SCRIPT_DIR%pmtiles.zip" "https://github.com/protomaps/go-pmtiles/releases/download/v%VERSION%/go-pmtiles-%VERSION%_Windows_x86_64.zip"
    tar -xf "%SCRIPT_DIR%pmtiles.zip" -C "%SCRIPT_DIR%"
    del "%SCRIPT_DIR%pmtiles.zip"
)
echo [Lyon Mod] Starting tile server on port 8081...
"%SCRIPT_DIR%pmtiles.exe" serve "%SCRIPT_DIR%" --port 8081 --cors=*
