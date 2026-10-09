"""Generate the portrait assets from a source photo.

    python scripts/generate-portrait.py path/to/photo.png

Writes:
  public/achraf-malki.png            canonical image (Person.image, sitemap, the
                                     hero <img src>): full resolution, circular
                                     alpha mask, stable URL
  src/assets/portrait-{400,800}.webp  what browsers actually download, via the
                                     hero <picture> sources

The source must be a square photo with the subject framed inside an inscribed
circle (anything outside the circle becomes transparent, so the portrait works
on both themes). Re-running on the canonical PNG is safe.

After running: update PORTRAIT width/height in src/seo/site.js if the size
changed, then run scripts/generate-og.ps1.

Requires Pillow (pip install pillow).
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
CANONICAL = ROOT / "public" / "achraf-malki.png"
VARIANTS = {400: ROOT / "src" / "assets" / "portrait-400.webp",
            800: ROOT / "src" / "assets" / "portrait-800.webp"}
EDGE_INSET = 3  # px trimmed inside the circle to drop the anti-aliased white rim
SUPERSAMPLE = 4


def circular_mask(size):
    big = size * SUPERSAMPLE
    mask = Image.new("L", (big, big), 0)
    inset = EDGE_INSET * SUPERSAMPLE
    ImageDraw.Draw(mask).ellipse((inset, inset, big - inset - 1, big - inset - 1), fill=255)
    return mask.resize((size, size), Image.LANCZOS)


def main(source):
    photo = Image.open(source).convert("RGBA")
    if photo.width != photo.height:
        sys.exit(f"source must be square, got {photo.width}x{photo.height}")

    photo.putalpha(circular_mask(photo.width))
    photo.save(CANONICAL, optimize=True)
    print(f"{CANONICAL.relative_to(ROOT)}  {photo.width}x{photo.height}  {CANONICAL.stat().st_size / 1024:.0f} KB")

    for width, path in VARIANTS.items():
        photo.resize((width, width), Image.LANCZOS).save(path, "WEBP", quality=82, method=6)
        print(f"{path.relative_to(ROOT)}  {width}x{width}  {path.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
