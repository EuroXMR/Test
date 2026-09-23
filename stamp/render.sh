#!/bin/sh
# Renders each stamp SVG to a 2000x2000 transparent PNG using headless Chromium.
cd "$(dirname "$0")"
python3 build.py
for n in saint-saint-studio-stamp saint-saint-studio-stamp-director; do
  /opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless=new --no-sandbox --hide-scrollbars --disable-gpu \
    --screenshot="$PWD/$n.png" --window-size=1000,1300 --force-device-scale-factor=2 \
    --default-background-color=00000000 "file://$PWD/$n.svg" 2>/dev/null
  python3 -c "from PIL import Image; im=Image.open('$n.png'); im.crop((0,0,2000,2000)).save('$n.png')"
done
