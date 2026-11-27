# Resize downloaded sample photos for the web and strip all metadata (EXIF/GPS).
# Usage: python3 -I scripts/prep-samples.py <download-dir> <out-dir>
import sys, pathlib
from PIL import Image, ImageOps
src, out = map(pathlib.Path, sys.argv[1:3])
for p in sorted(src.glob("*.raw")):
    try:
        im = Image.open(p)
    except Exception:
        continue
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((1280, 1280))
    dest = out / f"core-{p.stem}.jpg"
    im.save(dest, "JPEG", quality=80, optimize=True, progressive=True)  # no exif= → metadata dropped
    print(dest.name, im.size, dest.stat().st_size // 1024, "KB")
