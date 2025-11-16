#!/usr/bin/env node

/**
 * Image Conversion Script
 * Converts all .jpg images to .webp format and updates all references in the codebase
 * 
 * Requirements: Install sharp globally or locally
 * npm install sharp
 * 
 * Usage: node convert-images.js
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PROJECT_ROOT = path.join(__dirname);
const ASSETS_DIR = path.join(PROJECT_ROOT, 'public', 'assets');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const HTML_FILE = path.join(PROJECT_ROOT, 'index.html');

// Image directories to process
const IMAGE_DIRS = [
  path.join(ASSETS_DIR, 'Pictures'),
  path.join(ASSETS_DIR, 'PKAluminium'),
];

// Source files to update references
const SOURCE_FILES = [
  path.join(SRC_DIR, 'data', 'projects.js'),
  path.join(SRC_DIR, 'data', 'services.js'),
  path.join(SRC_DIR, 'pages', 'Home.jsx'),
  path.join(SRC_DIR, 'pages', 'Gallery.jsx'),
  path.join(SRC_DIR, 'pages', 'About.jsx'),
  path.join(SRC_DIR, 'pages', 'Contact.jsx'),
  HTML_FILE,
];

let convertedCount = 0;
let skippedCount = 0;
const conversionLog = [];

/**
 * Convert a single image from JPG to WebP
 */
async function convertImage(inputPath) {
  const outputPath = inputPath.replace(/\.jpg$/i, '.webp');
  
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    conversionLog.push(`✓ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`✓ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    convertedCount++;
    
    // Return the conversion info for reference updates
    return {
      oldName: path.basename(inputPath),
      newName: path.basename(outputPath),
      oldPath: inputPath.replace(/\.jpg$/i, ''),
      newPath: outputPath.replace(/\.webp$/, ''),
    };
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error.message);
    conversionLog.push(`✗ Error converting ${path.basename(inputPath)}: ${error.message}`);
  }
}

/**
 * Get all JPG files from a directory
 */
function getJpgFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return [];
  }
  
  return fs.readdirSync(dir)
    .filter(file => /\.jpg$/i.test(file))
    .map(file => path.join(dir, file));
}

/**
 * Update references in a file
 */
function updateFileReferences(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  replacements.forEach(({ oldPath, newPath }) => {
    // Create regex patterns for various path formats
    const patterns = [
      new RegExp(oldPath + '\\.jpg', 'g'),  // /path/to/image.jpg
      new RegExp(oldPath.replace(/\//g, '\\\\/') + '\\.jpg', 'g'), // escaped paths
    ];
    
    patterns.forEach(pattern => {
      if (pattern.test(content)) {
        content = content.replace(pattern, newPath + '.webp');
        updated = true;
      }
    });
  });
  
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated references in: ${path.relative(PROJECT_ROOT, filePath)}`);
    conversionLog.push(`✓ Updated references in: ${path.relative(PROJECT_ROOT, filePath)}`);
  }
}

/**
 * Main conversion process
 */
async function main() {
  console.log('🚀 Starting image conversion process...\n');
  
  try {
    // Step 1: Find all JPG files
    console.log('📁 Scanning for JPG images...\n');
    const jpgFiles = [];
    IMAGE_DIRS.forEach(dir => {
      jpgFiles.push(...getJpgFiles(dir));
    });
    
    if (jpgFiles.length === 0) {
      console.log('✓ No JPG files found to convert.');
      return;
    }
    
    console.log(`Found ${jpgFiles.length} JPG file(s) to convert.\n`);
    
    // Step 2: Convert images
    console.log('🎨 Converting images to WebP...\n');
    const replacements = [];
    
    for (const jpgFile of jpgFiles) {
      const result = await convertImage(jpgFile);
      if (result) {
        replacements.push(result);
      }
    }
    
    console.log(`\n✓ Converted ${convertedCount} image(s)\n`);
    
    // Step 3: Update references in source files
    console.log('📝 Updating references in source files...\n');
    SOURCE_FILES.forEach(file => {
      updateFileReferences(file, replacements);
    });
    
    // Step 4: Generate summary report
    console.log('\n' + '='.repeat(60));
    console.log('📊 CONVERSION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✓ Images converted: ${convertedCount}`);
    console.log(`✓ Source files updated: ${SOURCE_FILES.length}`);
    console.log('='.repeat(60) + '\n');
    
    // Save detailed log
    const logPath = path.join(PROJECT_ROOT, 'image-conversion.log');
    fs.writeFileSync(logPath, conversionLog.join('\n'), 'utf8');
    console.log(`📋 Detailed log saved to: image-conversion.log\n`);
    
    console.log('✅ Image conversion complete!\n');
    console.log('Next steps:');
    console.log('1. Review the converted WebP images');
    console.log('2. Test the application to ensure all images load correctly');
    console.log('3. (Optional) Delete original JPG files if satisfied with WebP quality');
    console.log('4. Commit changes to git: git add . && git commit -m "Convert images to WebP format"\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();
