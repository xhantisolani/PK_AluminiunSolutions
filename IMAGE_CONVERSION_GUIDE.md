# Image Conversion Guide - JPG to WebP

This guide explains how to use the `convert-images.js` script to automatically convert all JPG images in your project to WebP format and update all references throughout your codebase.

## Why WebP?

- **Smaller file sizes** (25-35% smaller than JPG)
- **Better quality** at the same file size
- **Faster loading times** for your website
- **Modern format** supported by all modern browsers
- **Improved SEO** performance

## Prerequisites

Before running the conversion script, you need to install the `sharp` library, which handles the image conversion.

### Installation

Run this command in your project root directory:

```bash
npm install sharp
```

Or if you prefer to install it globally:

```bash
npm install -g sharp
```

## Running the Script

### Step 1: Navigate to Project Root

```bash
cd c:\Users\Xhanti Solani\Downloads\pk-aluminium-welding-solutions\pk-aluminium-welding-solutions
```

### Step 2: Run the Conversion Script

```bash
node convert-images.js
```

### What the Script Does

The script will:

1. **Scan for JPG images** in these directories:
   - `/public/assets/Pictures/`
   - `/public/assets/PKAluminium/`

2. **Convert each JPG to WebP** with quality setting of 80 (excellent balance of quality and file size)

3. **Update all references** in:
   - `src/data/projects.js`
   - `src/data/services.js`
   - `src/pages/Home.jsx`
   - `src/pages/Gallery.jsx`
   - `src/pages/About.jsx`
   - `src/pages/Contact.jsx`
   - `index.html`

4. **Generate a conversion log** in `image-conversion.log`

## Expected Output

You should see output similar to:

```
🚀 Starting image conversion process...

📁 Scanning for JPG images...

Found 42 JPG file(s) to convert.

🎨 Converting images to WebP...

✓ Converted: landing-page.jpg → landing-page.webp
✓ Converted: about-hero-section.jpg → about-hero-section.webp
✓ Converted: image-1.jpg → image-1.webp
...

✓ Updated references in: src/data/projects.js
✓ Updated references in: src/pages/Home.jsx
✓ Updated references in: src/pages/Gallery.jsx
...

✅ Image conversion complete!
```

## Verification Steps

After running the script:

1. **Check WebP files exist**:
   - Open `/public/assets/Pictures/` and confirm `.webp` files are there
   - Open `/public/assets/PKAluminium/` and confirm `.webp` files are there

2. **Verify code updates**:
   - Open `src/data/projects.js` and confirm image paths now end in `.webp`
   - Check other updated files for the same

3. **Test the application**:
   ```bash
   npm run dev
   ```
   - Navigate through pages and verify all images load correctly

4. **Review the conversion log**:
   - Open `image-conversion.log` to see detailed conversion information

## Optional: Clean Up Old JPG Files

Once you've verified that the WebP conversion was successful and all images load correctly:

```bash
# Remove original JPG files from Pictures directory
Remove-Item public/assets/Pictures/*.jpg

# Remove original JPG files from PKAluminium directory
Remove-Item public/assets/PKAluminium/*.jpg
```

**Important**: Only delete the JPG files AFTER verifying that:
- All WebP images display correctly
- The application works without errors
- You have a git backup of your changes

## Reverting Changes

If you need to revert the changes for any reason:

```bash
# Restore from git
git checkout .

# Or restore specific converted files
git restore convert-images.js IMAGE_CONVERSION_GUIDE.md
```

## Troubleshooting

### Error: "Cannot find module 'sharp'"

**Solution**: Install sharp first:
```bash
npm install sharp
```

### Some images didn't convert

**Solution**: Check the `image-conversion.log` file for detailed error messages. Common issues:
- Corrupted image file
- Insufficient disk space
- File permission issues

### References not updated in some files

**Solution**: The script updates references in specific known files. If you have image references in other files:
1. Manually find and replace `.jpg` with `.webp`
2. Search in your project: `Find all: .jpg` and replace with `.webp`

### WebP images not displaying

**Solution**: 
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Verify WebP file paths are correct
4. Check browser console for 404 errors

## Advanced: Custom Quality Setting

To adjust the WebP quality (default is 80), edit `convert-images.js` and change this line:

```javascript
.webp({ quality: 80 })  // Change 80 to a value between 1-100
```

- Lower values (60-70): Smaller files, slightly lower quality
- Higher values (85-100): Larger files, higher quality

## Git Integration

After successful conversion and testing:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Convert all JPG images to WebP format for better performance"

# Push to repository
git push -u origin main
```

## Performance Improvements

After conversion, you should see:
- **Reduced image file sizes** by 25-35%
- **Faster page load times** (especially on slower connections)
- **Improved Core Web Vitals** scores
- **Better SEO ranking** due to improved performance

## Support

If you encounter any issues:
1. Check the `image-conversion.log` file for detailed information
2. Ensure `sharp` is properly installed
3. Verify file permissions on image directories
4. Try running the script again with administrator privileges

---

**Happy converting!** 🎉
