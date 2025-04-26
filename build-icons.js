const sharp = require('sharp');
const fs = require('fs');

const sizes = [16, 32, 64, 128, 256, 512];

async function buildIcons() {
  const svgBuffer = fs.readFileSync('icon.svg');
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`build/icon-${size}.png`);
  }
  
  console.log('Icons built successfully!');
}

buildIcons().catch(console.error); 