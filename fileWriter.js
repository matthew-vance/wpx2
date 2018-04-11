const path = require('path'),
  fs = require('fs');

class FileWriter {
  constructor() {
    this.writeFiles = this.writeFiles.bind(this);
  }
  writeFiles(dir, files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      writeToFolder(`${dir}/${file.dir}`, file.fileName, file.contents);
    }
  }
}

const writeToFolder = (dir, fileName, contents) => {
  fs.writeFileSync(`${dir}/${fileName}`, contents);
}
  
module.exports = FileWriter;