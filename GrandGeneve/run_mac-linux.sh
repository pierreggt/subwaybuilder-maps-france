#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="$SCRIPT_DIR/../../cities/data/GVA"
VERSION="1.30.0"
echo "[Grand Geneve Mod] Copying data files to cities/data/GVA..."
mkdir -p "$TARGET"
cp -f "$SCRIPT_DIR/data/GVA/"* "$TARGET/"
echo "[Grand Geneve Mod] Data files copied successfully."
if [ ! -f "$SCRIPT_DIR/pmtiles" ]; then
    echo "[Grand Geneve Mod] Downloading pmtiles..."
    OS=$(uname -s); ARCH=$(uname -m)
    if [ "$OS" = "Darwin" ]; then
        if [ "$ARCH" = "arm64" ]; then URL="https://github.com/protomaps/go-pmtiles/releases/download/v${VERSION}/go-pmtiles-${VERSION}_Darwin_arm64.zip"
        else URL="https://github.com/protomaps/go-pmtiles/releases/download/v${VERSION}/go-pmtiles-${VERSION}_Darwin_x86_64.zip"; fi
        curl -L -f -o "$SCRIPT_DIR/pmtiles.zip" "$URL" && unzip -j -o "$SCRIPT_DIR/pmtiles.zip" "pmtiles" -d "$SCRIPT_DIR" && rm "$SCRIPT_DIR/pmtiles.zip"
    elif [ "$OS" = "Linux" ]; then
        URL="https://github.com/protomaps/go-pmtiles/releases/download/v${VERSION}/go-pmtiles_${VERSION}_Linux_x86_64.tar.gz"
        curl -L -o "$SCRIPT_DIR/pmtiles.tar.gz" "$URL" && tar -xzf "$SCRIPT_DIR/pmtiles.tar.gz" -C "$SCRIPT_DIR" pmtiles && rm "$SCRIPT_DIR/pmtiles.tar.gz"
    fi
    chmod +x "$SCRIPT_DIR/pmtiles"
fi
echo "[Grand Geneve Mod] Starting tile server on port 8094..."
"$SCRIPT_DIR/pmtiles" serve "$SCRIPT_DIR" --port 8094 --cors=*
