const fs = require("fs");
const path = require("path");


if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public", { recursive: true });
}


if (!fs.existsSync("./public/api")) {
  fs.mkdirSync("./public/API", { recursive: true });
}


const configContent = `const config = {
  EMAIL_PUBLIC_KEY: '${process.env.EMAIL_PUBLIC_KEY}',
  EMAIL_SERVICE_ID: '${process.env.EMAIL_SERVICE_ID}',
  EMAIL_TEMPLATE_ID: '${process.env.EMAIL_TEMPLATE_ID}'
};`;


fs.writeFileSync("./public/api/config.js", configContent);


const filesToCopy = ['index.html', 'main.js', 'style.css'];

filesToCopy.forEach(file => {
  const srcPath = path.join('./src', file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, `./public/${file}`);
    console.log(`Copied ${srcPath} to ./public/${file}`);
  } else {
    console.log(`Warning: ${srcPath} not found`);
  }
});

console.log("Build completed: Files have been copied to public directory");