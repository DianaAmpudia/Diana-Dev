const fs = require("fs");

const configContent = `const config = {
  EMAIL_PUBLIC_KEY: '${process.env.EMAIL_PUBLIC_KEY}',
  EMAIL_SERVICE_ID: '${process.env.EMAIL_SERVICE_ID}',
  EMAIL_TEMPLATE_ID: '${process.env.EMAIL_TEMPLATE_ID}'
};`;


if (!fs.existsSync("./src")) {
  fs.mkdirSync("./src", { recursive: true });
}

fs.writeFileSync("./src/config.js", configContent);
console.log("Config file has been generated");
