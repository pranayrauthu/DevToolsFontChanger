const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const packageJson = require('./package.json');

// Create a new zip file
const zip = new AdmZip();
const outputFile = `devtools-font-changer-v${packageJson.version}.zip`;

// Get all files from the src directory
const srcDir = path.join(__dirname, 'src');
const files = fs.readdirSync(srcDir);

// Add each file to the zip
files.forEach(file => {
  const filePath = path.join(srcDir, file);
  const stats = fs.statSync(filePath);
  
  if (stats.isFile()) {
    console.log(`Adding file: ${file}`);
    zip.addLocalFile(filePath, '', file);
  } else if (stats.isDirectory()) {
    // Handle directories like icons
    const dirName = file;
    const dirPath = path.join(srcDir, dirName);
    const dirFiles = fs.readdirSync(dirPath);
    
    dirFiles.forEach(dirFile => {
      const dirFilePath = path.join(dirPath, dirFile);
      if (fs.statSync(dirFilePath).isFile()) {
        console.log(`Adding file: ${dirName}/${dirFile}`);
        zip.addLocalFile(dirFilePath, dirName, dirFile);
      }
    });
  }
});

// Write the zip file
zip.writeZip(outputFile);

console.log(`Extension packed successfully: ${outputFile}`);
console.log(`Version: ${packageJson.version}`);
