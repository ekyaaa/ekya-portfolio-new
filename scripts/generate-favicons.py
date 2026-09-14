import os
from PIL import Image, ImageOps

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO_PATH = os.path.join(BASE_DIR, "src", "assets", "images", "logo.png")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

def generate_favicons():
    print(f"Loading base logo from: {LOGO_PATH}")
    img = Image.open(LOGO_PATH).convert("RGBA")
    w, h = img.size
    print(f"Original logo dimensions: {w}x{h}")

    # 1. Create Light Mode Image (standard charcoal + navy)
    # Resize to standard favicon dimensions
    light_img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    light_img_48 = img.resize((48, 48), Image.Resampling.LANCZOS)
    light_img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)

    light_32_path = os.path.join(PUBLIC_DIR, "favicon-light.png")
    light_img_32.save(light_32_path, "PNG")
    print(f"Saved: {light_32_path}")

    # Standard favicon.ico / favicon-32x32.png
    fav_32_path = os.path.join(PUBLIC_DIR, "favicon-32x32.png")
    light_img_32.save(fav_32_path, "PNG")

    # 2. Create Dark Mode Image
    # In dark mode:
    # - Dark charcoal / black strokes (#454649) -> White (#FFFFFF)
    # - Navy sparks at top -> Warm Peach (#FDCCA3: R:253, G:204, B:163)
    # Preserving alpha/anti-aliasing transparency
    dark_img = Image.new("RGBA", (w, h))
    pixels = img.load()
    dark_pixels = dark_img.load()

    # Determine pixel color classification based on hue / position / RGB
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0:
                dark_pixels[x, y] = (0, 0, 0, 0)
                continue

            # Analyze color:
            # Sparks are at the top (roughly y < 0.35 * h) and have blue/navy hue (b > r)
            is_spark = (y < h * 0.38) and ((b > r + 15) or (g > r + 15 and b > 70))
            
            if is_spark:
                # Transform to Warm Peach #FDCCA3 (253, 204, 163)
                factor = a / 255.0
                dark_pixels[x, y] = (253, 204, 163, a)
            else:
                # Transform charcoal stroke to Pure White #FFFFFF
                dark_pixels[x, y] = (255, 255, 255, a)

    dark_img_32 = dark_img.resize((32, 32), Image.Resampling.LANCZOS)
    dark_img_48 = dark_img.resize((48, 48), Image.Resampling.LANCZOS)
    dark_img_192 = dark_img.resize((192, 192), Image.Resampling.LANCZOS)

    dark_32_path = os.path.join(PUBLIC_DIR, "favicon-dark.png")
    dark_img_32.save(dark_32_path, "PNG")
    print(f"Saved: {dark_32_path}")

    # 3. Apple Touch Icon (180x180 with clean soft padding or background)
    apple_touch_bg = Image.new("RGBA", (180, 180), (254, 254, 254, 255))
    apple_icon_content = img.resize((130, 130), Image.Resampling.LANCZOS)
    apple_touch_bg.paste(apple_icon_content, (25, 25), apple_icon_content)
    apple_touch_path = os.path.join(PUBLIC_DIR, "apple-touch-icon.png")
    apple_touch_bg.convert("RGB").save(apple_touch_path, "PNG")
    print(f"Saved: {apple_touch_path}")

    # 4. Generate High-Res Adaptive SVG Favicon
    # We will embed both data-URIs or vector paths with @media (prefers-color-scheme: dark)
    import base64
    import io

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

if __name__ == "__main__":
    generate_favicons()
