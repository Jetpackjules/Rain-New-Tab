import os
from PIL import Image, ImageFilter
import glob

# Define input and output directories
input_dir = "PREPROCESS PHOTOS\\raw photos"
output_dir = "PREPROCESS PHOTOS\\processed"
ouput_dir_extension = "rainyExtension\\img\\rotation"

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Delete existing files in output directory
files = glob.glob(os.path.join(output_dir, '*'))
for f in files:
    os.remove(f)
    
# Delete existing files in output directory
files = glob.glob(os.path.join(ouput_dir_extension, '*'))
for f in files:
    os.remove(f)
    

# Define target resolutions
bg_resolution = (384, 256)  # Adjust this to match the provided blurred image resolution
fg_resolution = (192, 128)   # Adjust this to match the provided smaller image resolution

# Process images
for idx, img_path in enumerate(glob.glob(os.path.join(input_dir, "*"))):
    with Image.open(img_path) as img:
        # Create background (blurred) image
        bg_img = img.copy()
        bg_img = bg_img.filter(ImageFilter.GaussianBlur(radius=5))  # Adjust radius as needed
        bg_img = bg_img.resize(bg_resolution, Image.LANCZOS)
        
        # Crop if necessary
        if bg_img.size != bg_resolution:
            left = (bg_img.width - bg_resolution[0]) / 2
            top = (bg_img.height - bg_resolution[1]) / 2
            right = (bg_img.width + bg_resolution[0]) / 2
            bottom = (bg_img.height + bg_resolution[1]) / 2
            bg_img = bg_img.crop((left, top, right, bottom))
        
        bg_img.save(os.path.join(output_dir, f"image-{idx+1}-bg.png"), "PNG")
        bg_img.save(os.path.join(ouput_dir_extension, f"image-{idx+1}-bg.png"), "PNG")

        

        # Create foreground (non-blurred, smaller) image
        fg_img = img.copy()
        fg_img = fg_img.resize(fg_resolution, Image.LANCZOS)
        
        # Crop if necessary
        if fg_img.size != fg_resolution:
            left = (fg_img.width - fg_resolution[0]) / 2
            top = (fg_img.height - fg_resolution[1]) / 2
            right = (fg_img.width + fg_resolution[0]) / 2
            bottom = (fg_img.height + fg_resolution[1]) / 2
            fg_img = fg_img.crop((left, top, right, bottom))
        
        fg_img.save(os.path.join(output_dir, f"image-{idx+1}-fg.png"), "PNG")
        fg_img.save(os.path.join(ouput_dir_extension, f"image-{idx+1}-fg.png"), "PNG")


print("Image processing complete.")