const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'frontend', 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const replacements = [
  { search: /#C6A75E/gi, replace: '#FF9100' }, // Gold to Orange/Gold
  { search: /#B0934E/gi, replace: '#E08000' }, // Gold Hover to Orange Hover
  { search: /#1F2A44/gi, replace: '#0B2C1F' }  // Navy to Forest Green
];

walkDir(srcDir, (filePath) => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
      content = content.replace(r.search, r.replace);
    });
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Replaced colors in: ${path.relative(srcDir, filePath)}`);
    }
  }
});
console.log('Hex replacements completed successfully!');
