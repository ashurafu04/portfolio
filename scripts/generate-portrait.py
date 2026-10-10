"""Generate the portrait assets.

    python scripts/generate-portrait.py path/to/new-photo.png   replace the portrait
    python scripts/generate-portrait.py                         rebuild WebP sizes only

Writes:
  public/achraf-malki.png            canonical image (Person.image, sitemap, the
                                     hero <img src>): full resolution, circular
                                     alpha mask, stable URL
  src/assets/portrait-{400,800}.webp  what browsers actually download, via the
                                     hero <picture> sources

A new photo must be square: a circular cut-out on a pure-white (#ffffff)
canvas. Hand-cut circles are rarely perfect, so the script measures where the
cut-out actually is and masks just inside its tightest point; everything
outside becomes transparent, so the portrait works on both themes. The
canonical PNG is the master afterwards: no other copy needs to be kept.

After replacing the photo: update PORTRAIT width/height in src/seo/site.js if
the size changed, then run scripts/generate-og.ps1.

Requires Pillow (pip install pillow).
"""
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
CANONICAL = ROOT / "public" / "achraf-malki.png"
VARIANTS = {400: ROOT / "src" / "assets" / "portrait-400.webp",
            800: ROOT / "src" / "assets" / "portrait-800.webp"}
EDGE_INSET = 3  # px kept clear of the cut-out's anti-aliased white rim
SUPERSAMPLE = 4
WHITE = (255, 255, 255)


def cutout_radius(photo):
    """Smallest distance from the centre to the cut-out's edge, over all angles.

    Marches inward along each ray until it leaves the pure-white canvas. Using
    the minimum means a mask of this radius never includes canvas white, even
    where the cut-out is dented or off-centre.
    """
    rgb = photo.convert("RGB")
    px = rgb.load()
    size = rgb.width
    centre = (size - 1) / 2
    radii = []
    for degree in range(360):
        dx, dy = math.cos(math.radians(degree)), math.sin(math.radians(degree))
        for r in range(int(size * 0.75), size // 4, -1):
            x, y = round(centre + dx * r), round(centre + dy * r)
            if 0 <= x < size and 0 <= y < size and px[x, y] != WHITE:
                radii.append(r)
                break
    if len(radii) < 360:
        sys.exit("could not find the cut-out edge on every ray: expected a circle on a pure-white canvas")
    return min(radii)


def circular_mask(size, radius):
    big = size * SUPERSAMPLE
    centre = (big - 1) / 2
    r = radius * SUPERSAMPLE
    mask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask).ellipse((centre - r, centre - r, centre + r, centre + r), fill=255)
    return mask.resize((size, size), Image.LANCZOS)


def replace_canonical(source):
    photo = Image.open(source).convert("RGBA")
    if photo.width != photo.height:
        sys.exit(f"source must be square, got {photo.width}x{photo.height}")

    edge = cutout_radius(photo)
    radius = edge - EDGE_INSET
    print(f"cut-out edge at r>={edge}px; masking at r={radius}px")

    photo.putalpha(circular_mask(photo.width, radius))
    photo.save(CANONICAL, optimize=True)
    print(f"{CANONICAL.relative_to(ROOT)}  {photo.width}x{photo.height}  {CANONICAL.stat().st_size / 1024:.0f} KB")


def write_variants():
    photo = Image.open(CANONICAL).convert("RGBA")
    for width, path in VARIANTS.items():
        photo.resize((width, width), Image.LANCZOS).save(path, "WEBP", quality=82, method=6)
        print(f"{path.relative_to(ROOT)}  {width}x{width}  {path.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    if len(sys.argv) > 2:
        sys.exit(__doc__)
    if len(sys.argv) == 2:
        replace_canonical(sys.argv[1])
    write_variants()
