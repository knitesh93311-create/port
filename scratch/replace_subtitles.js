const fs = require('fs');
const path = require('path');

const filesToProcess = [
  {
    filePath: path.join(__dirname, '..', 'frontend', 'src', 'components', 'About.jsx'),
    from: `<span className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#C6A75E] mb-2 block">[\s\n]*ABOUT ME[\s\n]*</span>`,
    to: `<span className="inline-flex items-center bg-[#C6A75E]/8 border border-[#C6A75E]/20 rounded-full px-4 py-1.5 mb-4 font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6853C]">
              ABOUT ME
            </span>`
  },
  {
    filePath: path.join(__dirname, '..', 'frontend', 'src', 'components', 'Projects.jsx'),
    from: `<span className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#C6A75E] mb-2 block">[\s\n]*FEATURED PORTFOLIO[\s\n]*</span>`,
    to: `<span className="inline-flex items-center bg-[#C6A75E]/8 border border-[#C6A75E]/20 rounded-full px-4 py-1.5 mb-4 font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6853C]">
            FEATURED PORTFOLIO
          </span>`
  },
  {
    filePath: path.join(__dirname, '..', 'frontend', 'src', 'components', 'Contact.jsx'),
    from: `<span className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#C6A75E] mb-2 block">[\s\n]*GET IN TOUCH[\s\n]*</span>`,
    to: `<span className="inline-flex items-center bg-[#C6A75E]/8 border border-[#C6A75E]/20 rounded-full px-4 py-1.5 mb-4 font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6853C]">
            GET IN TOUCH
          </span>`
  },
  {
    filePath: path.join(__dirname, '..', 'frontend', 'src', 'components', 'Experience.jsx'),
    from: `<span className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#C6A75E] mb-2 block">[\s\n]*MY JOURNEY[\s\n]*</span>`,
    to: `<span className="inline-flex items-center bg-[#C6A75E]/8 border border-[#C6A75E]/20 rounded-full px-4 py-1.5 mb-4 font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6853C]">
            MY JOURNEY
          </span>`
  },
  {
    filePath: path.join(__dirname, '..', 'frontend', 'src', 'components', 'Services.jsx'),
    from: `<span className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#C6A75E] mb-2 block">[\s\n]*SERVICES[\s\n]*</span>`,
    to: `<span className="inline-flex items-center bg-[#C6A75E]/8 border border-[#C6A75E]/20 rounded-full px-4 py-1.5 mb-4 font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6853C]">
            SERVICES
          </span>`
  },
  {
    filePath: path.join(__dirname, '..', 'frontend', 'src', 'components', 'Testimonials.jsx'),
    from: `<span className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#C6A75E] mb-2 block">[\s\n]*TESTIMONIALS[\s\n]*</span>`,
    to: `<span className="inline-flex items-center bg-[#C6A75E]/8 border border-[#C6A75E]/20 rounded-full px-4 py-1.5 mb-4 font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6853C]">
            TESTIMONIALS
          </span>`
  }
];

filesToProcess.forEach(item => {
  if (fs.existsSync(item.filePath)) {
    let content = fs.readFileSync(item.filePath, 'utf8');
    const regex = new RegExp(item.from, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, item.to);
      fs.writeFileSync(item.filePath, content, 'utf8');
      console.log(`Processed: ${path.basename(item.filePath)}`);
    } else {
      console.log(`Pattern not found in: ${path.basename(item.filePath)}`);
    }
  } else {
    console.log(`File not found: ${item.filePath}`);
  }
});
console.log('Subtitle highlighting complete!');
