const fs = require('fs');
const path = require('path');

// Chat widget environment variables
const config = {
  integrationID: process.env.INTEGRATION_ID,
  region: process.env.REGION,
  serviceInstanceID: process.env.SERVICE_INSTANCE_ID,
};

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Generate config file
fs.writeFileSync(
  path.join('dist', 'config.js'), 
  `window.CHAT_CONFIG = ${JSON.stringify(config, null, 2)};`
);

// Function to copy files and directories recursively
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // Copy all files in directory
    const files = fs.readdirSync(src);
    files.forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      copyRecursive(srcPath, destPath);
    });
  } else {
    // Copy file
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} → ${dest}`);
  }
}

// Files and folders to copy
const itemsToCopy = [
  'home.html',
  'products.html',
  'contact.html',
  'about.html',
  '404.html',
  'css', 
  'js',
  'img',
  'favicon.ico',
];

// Copy each item
itemsToCopy.forEach(item => {
  if (fs.existsSync(item)) {
    const destPath = path.join('dist', item);
    copyRecursive(item, destPath);
  } else {
    console.log(`Warning: ${item} not found, skipping...`);
  }
});

console.log('✅ Build completed! Config generated and files copied to dist/');
console.log(`📁 Config available as: window.CHAT_CONFIG`);
console.log(`🔧 Variables: ${Object.keys(config).join(', ')}`);