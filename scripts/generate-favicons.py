import os
import io
import base64
import json
import shutil
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO_PATH = os.path.join(BASE_DIR, "src", "assets", "images", "logo.png")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
PUBLIC_IMAGES_DIR = os.path.join(PUBLIC_DIR, "assets", "images")

def generate_favicons():
    print(f"Loading base logo from: {LOGO_PATH}")
    img = Image.open(LOGO_PATH).convert("RGBA")
    w, h = img.size
    print(f"Original logo dimensions: {w}x{h}")

    os.makedirs(PUBLIC_DIR, exist_ok=True)
    os.makedirs(PUBLIC_IMAGES_DIR, exist_ok=True)

    # Copy latest logo to public/assets/images/logo.png
    public_logo_path = os.path.join(PUBLIC_IMAGES_DIR, "logo.png")
    shutil.copyfile(LOGO_PATH, public_logo_path)
    print(f"Synced latest logo to: {public_logo_path}")

    # 1. Multi-resolution favicon.ico (16x16, 32x32, 48x48)
    # Required by Googlebot-Image & legacy browsers at root /favicon.ico
    fav_ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
    img.save(fav_ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Saved: {fav_ico_path}")

    # 2. Standard and high-DPI PNG Favicons (including multiples of 48px for Google Search)
    png_sizes = [
        ("favicon-16x16.png", (16, 16)),
        ("favicon-32x32.png", (32, 32)),
        ("favicon-48x48.png", (48, 48)),   # Official Google Search primary recommendation
        ("favicon-96x96.png", (96, 96)),   # 2x Google Search
        ("favicon-192x192.png", (192, 192)), # Android / PWA
        ("favicon-512x512.png", (512, 512)), # High-res PWA
        ("favicon-light.png", (48, 48)),
    ]

    for filename, size in png_sizes:
        resized = img.resize(size, Image.Resampling.LANCZOS)
        out_path = os.path.join(PUBLIC_DIR, filename)
        resized.save(out_path, "PNG")
        print(f"Saved: {out_path} ({size[0]}x{size[1]})")

    # 3. Create Dark Mode Image
    # In dark mode:
    # - Dark charcoal / black strokes (#454649) -> White (#FFFFFF)
    # - Navy sparks at top -> Warm Peach (#FDCCA3: R:253, G:204, B:163)
    dark_img = Image.new("RGBA", (w, h))
    pixels = img.load()
    dark_pixels = dark_img.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0:
                dark_pixels[x, y] = (0, 0, 0, 0)
                continue

            # Analyze color:
            is_spark = (y < h * 0.38) and ((b > r + 15) or (g > r + 15 and b > 70))
            if is_spark:
                dark_pixels[x, y] = (253, 204, 163, a)
            else:
                dark_pixels[x, y] = (255, 255, 255, a)

    dark_img_48 = dark_img.resize((48, 48), Image.Resampling.LANCZOS)
    dark_48_path = os.path.join(PUBLIC_DIR, "favicon-dark.png")
    dark_img_48.save(dark_48_path, "PNG")
    print(f"Saved: {dark_48_path}")

    # 4. Apple Touch Icon (180x180 with clean soft background padding)
    apple_touch_bg = Image.new("RGBA", (180, 180), (254, 254, 254, 255))
    apple_icon_content = img.resize((130, 130), Image.Resampling.LANCZOS)
    apple_touch_bg.paste(apple_icon_content, (25, 25), apple_icon_content)
    apple_touch_path = os.path.join(PUBLIC_DIR, "apple-touch-icon.png")
    apple_touch_bg.convert("RGB").save(apple_touch_path, "PNG")
    print(f"Saved: {apple_touch_path}")

    # 5. Generate High-Res Adaptive SVG Favicon
    buf_light = io.BytesIO()
    img.save(buf_light, format="PNG")
    b64_light = base64.b64encode(buf_light.getvalue()).decode("utf-8")

    buf_dark = io.BytesIO()
    dark_img.save(buf_dark, format="PNG")
    b64_dark = base64.b64encode(buf_dark.getvalue()).decode("utf-8")

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <style>
    .fav-light {{ display: block; }}
    .fav-dark {{ display: none; }}
    @media (prefers-color-scheme: dark) {{
      .fav-light {{ display: none; }}
      .fav-dark {{ display: block; }}
    }}
  </style>
  <image class="fav-light" href="data:image/png;base64,{b64_light}" width="100" height="100" />
  <image class="fav-dark" href="data:image/png;base64,{b64_dark}" width="100" height="100" />
</svg>
'''
    svg_path = os.path.join(PUBLIC_DIR, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Saved adaptive SVG favicon: {svg_path}")

    # 6. Web App Manifest (site.webmanifest)
    manifest_content = {
        "name": "Ekya Muhammad - System Analyst & Fullstack Developer",
        "short_name": "Ekya Muhammad",
        "description": "Portfolio of Ekya Muhammad - System Analyst & Fullstack Developer",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#FEFEFE",
        "theme_color": "#FEFEFE",
        "icons": [
            {
                "src": "/favicon-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/favicon-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    }
    manifest_path = os.path.join(PUBLIC_DIR, "site.webmanifest")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest_content, f, indent=2)
    print(f"Saved Web App Manifest: {manifest_path}")

if __name__ == "__main__":
    generate_favicons()
