#!/usr/bin/env python3
import os
import sys
from PIL import Image

def optimize_images(root_dir):
    print(f"--- Optimizing Images in {root_dir} ---")
    total_before = 0
    total_after = 0
    processed_count = 0

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            path = os.path.join(root, file)
            ext = os.path.splitext(file)[1].lower()

            if ext in ['.pdf', '.mp4', '.svg', '.md']:
                continue

            before_sz = os.path.getsize(path)
            total_before += before_sz

            try:
                im = Image.open(path)
                orig_format = im.format
                w, h = im.size

                # Format-aware optimization strategy
                is_jpeg = ext in ['.jpg', '.jpeg']
                is_png = ext in ['.png']

                # Max bounds
                max_w, max_h = 1920, 1440
                if 'illustration' in file.lower() or 'my-photo' in file.lower():
                    max_w, max_h = 800, 800

                # Compute new dimensions preserving aspect ratio
                new_w, new_h = w, h
                if w > max_w or h > max_h:
                    ratio = min(max_w / w, max_h / h)
                    new_w = int(w * ratio)
                    new_h = int(h * ratio)

                # Resize if needed
                if (new_w, new_h) != (w, h):
                    im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)

                temp_path = path + '.tmp'

                if is_jpeg or orig_format in ['JPEG', 'MPO']:
                    # Photography JPEG: 82% quality, progressive, optimized
                    if im.mode != 'RGB':
                        im = im.convert('RGB')
                    im.save(temp_path, 'JPEG', quality=82, optimize=True, progressive=True)

                elif is_png:
                    # UI Screenshots / Graphic: maintain crisp text and alpha channel
                    if im.mode not in ['RGBA', 'RGB', 'L', 'LA', 'P']:
                        im = im.convert('RGBA')
                    im.save(temp_path, 'PNG', optimize=True)

                else:
                    if os.path.exists(temp_path):
                        os.remove(temp_path)
                    total_after += before_sz
                    continue

                after_sz = os.path.getsize(temp_path)

                if after_sz < before_sz:
                    os.replace(temp_path, path)
                    total_after += after_sz
                    processed_count += 1
                    saved_pct = (before_sz - after_sz) / before_sz * 100
                    print(f"Optimized {file}: {before_sz/(1024):.1f}KB -> {after_sz/(1024):.1f}KB (-{saved_pct:.1f}%) | {w}x{h} -> {new_w}x{new_h}")
                else:
                    os.remove(temp_path)
                    total_after += before_sz
                    print(f"Kept original {file}: already optimal ({before_sz/(1024):.1f}KB)")

            except Exception as e:
                print(f"Error processing {path}: {e}")
                total_after += before_sz

    print(f"\n--- Summary ---")
    print(f"Total Before: {total_before / (1024*1024):.2f} MB")
    print(f"Total After:  {total_after / (1024*1024):.2f} MB")
    print(f"Total Saved:  {(total_before - total_after) / (1024*1024):.2f} MB (-{(total_before - total_after)/total_before * 100:.1f}%)")

if __name__ == '__main__':
    target_dir = sys.argv[1] if len(sys.argv) > 1 else 'src/assets'
    optimize_images(target_dir)
