const fs = require("fs");
const path = require("path");


function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}


function copyDirectory(src, dest) {
  ensureDirectoryExists(dest);
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  }
}


ensureDirectoryExists("./public");
ensureDirectoryExists("./public/api");

// Generar el archivo de configuración
const configContent = `const config = {
  EMAIL_PUBLIC_KEY: '${process.env.EMAIL_PUBLIC_KEY}',
  EMAIL_SERVICE_ID: '${process.env.EMAIL_SERVICE_ID}',
  EMAIL_TEMPLATE_ID: '${process.env.EMAIL_TEMPLATE_ID}'
};`;


const configPath = './public/api/config.js';
fs.writeFileSync(configPath, configContent);
console.log(`Created config file: ${configPath}`);

const filesToCopy = ['index.html', 'main.js', 'styles.css'];

filesToCopy.forEach(file => {
  const srcPath = path.join('./src', file);
  const destPath = path.join('./public', file);
  
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} to ${destPath}`);
    } else {
      console.log(`Warning: Source file not found: ${srcPath}`);
    }
  } catch (error) {
    console.error(`Error copying ${file}:`, error);
  }
});


const srcAssetsPath = './src/assets';
const destAssetsPath = './public/assets';
if (fs.existsSync(srcAssetsPath)) {
  try {
    copyDirectory(srcAssetsPath, destAssetsPath);
    console.log('Assets directory copied successfully');
  } catch (error) {
    console.error('Error copying assets directory:', error);
  }
} else {
  console.log('Warning: Assets directory not found in src');
}

console.log("Build process completed");