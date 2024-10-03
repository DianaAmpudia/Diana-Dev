const fs = require("fs");
const path = require("path");


function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}


ensureDirectoryExists("./public");
ensureDirectoryExists("./public/api");


const configContent = `const config = {
  EMAIL_PUBLIC_KEY: '${process.env.EMAIL_PUBLIC_KEY}',
  EMAIL_SERVICE_ID: '${process.env.EMAIL_SERVICE_ID}',
  EMAIL_TEMPLATE_ID: '${process.env.EMAIL_TEMPLATE_ID}'
};`;


const configPath = './public/api/config.js';
fs.writeFileSync(configPath, configContent);
console.log(`Created config file: ${configPath}`);


const filesToCopy = ['index.html', 'main.js', 'style.css'];

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

console.log("Build process completed");