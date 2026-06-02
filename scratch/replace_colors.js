const fs = require('fs');
const path = require('path');

const Replacements = [
  // Hex Colors
  { from: /#2563EB/gi, to: '#C6A75E' },  // Blue -> Soft Gold
  { from: /#1D4ED8/gi, to: '#B0934E' },  // Blue Hover -> Darker Gold
  { from: /#06B6D4/gi, to: '#1F2A44' },  // Cyan -> Navy
  { from: /#0F172A/gi, to: '#1F2A44' },  // Slate-900 -> Navy
  { from: /#38BDF8/gi, to: '#E8DCC8' },  // Light blue -> Warm Beige
  { from: /#1e3a8a/gi, to: '#1F2A44' },  // Dark Blue -> Navy
  { from: /#1E3A8A/gi, to: '#1F2A44' },

  // Tailwind Classes
  { from: /bg-blue-50\/50/g, to: 'bg-[#C6A75E]/5' },
  { from: /bg-blue-50\/70/g, to: 'bg-[#E8DCC8]/20' },
  { from: /bg-blue-50/g, to: 'bg-[#C6A75E]/10' },
  { from: /text-[#2563EB]/g, to: 'text-[#C6A75E]' },
  { from: /border-blue-100/g, to: 'border-[#C6A75E]/20' },
  { from: /border-blue-200\/70/g, to: 'border-[#C6A75E]/40' },
  { from: /border-blue-200/g, to: 'border-[#C6A75E]/30' },
  { from: /bg-blue-400\/10/g, to: 'bg-[#C6A75E]/10' },
  { from: /shadow-blue-500\/10/g, to: 'shadow-[#C6A75E]/10' },
  { from: /shadow-blue-500\/20/g, to: 'shadow-[#C6A75E]/20' },
  { from: /text-blue-500/g, to: 'text-[#C6A75E]' },
  { from: /text-blue-600/g, to: 'text-[#C6A75E]' },
  { from: /bg-blue-600\/10/g, to: 'bg-[#C6A75E]/10' },
  { from: /bg-blue-600/g, to: 'bg-[#C6A75E]' },
  { from: /hover:bg-blue-700/g, to: 'hover:bg-[#B0934E]' },
  { from: /from-blue-500\/10/g, to: 'from-[#C6A75E]/10' },
  { from: /from-blue-500/g, to: 'from-[#C6A75E]' },
  { from: /to-cyan-500\/10/g, to: 'to-[#1F2A44]/10' },
  { from: /from-blue-600/g, to: 'from-[#C6A75E]' },
  { from: /to-cyan-400/g, to: 'to-[#1F2A44]' },
  { from: /border-blue-500\/30/g, to: 'border-[#C6A75E]/30' },
  { from: /bg-blue-500\/5/g, to: 'bg-[#C6A75E]/5' },
  { from: /hover:border-blue-400/g, to: 'hover:border-[#C6A75E]' },
  { from: /to-indigo-500/g, to: 'to-[#1F2A44]' },
  { from: /group-hover:bg-blue-50/g, to: 'group-hover:bg-[#C6A75E]/15' },
  { from: /group-hover:text-blue-600/g, to: 'group-hover:text-[#C6A75E]' },
  { from: /text-blue-600\/10/g, to: 'text-[#C6A75E]/10' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let original = content;
      Replacements.forEach(rep => {
        content = content.replace(rep.from, rep.to);
      });
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Processed: ${filePath}`);
      }
    }
  });
}

// Start processing components and main page files
const srcDir = path.join(__dirname, '..', 'frontend', 'src');
processDirectory(srcDir);
console.log('Color replacements complete!');
