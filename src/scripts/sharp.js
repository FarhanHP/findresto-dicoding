const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../public/images/heros');
const destination = path.resolve(__dirname, '../public/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
  .forEach((image) => {
    sharp(`${target}/${image}`)
      .resize(1280) // width 1280px
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
        .slice(0, -1)
        .join('.')}-large.jpg`));

    sharp(`${target}/${image}`)
      .resize(960)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
        .slice(0, -1)
        .join('.')}-medium.jpg`));

    sharp(`${target}/${image}`)
      .resize(600)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
        .slice(0, -1)
        .join('.')}-small.jpg`));
  });
