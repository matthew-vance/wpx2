const path = require('path'),
  fs = require('fs');

class FileGenerator {
  constructor(templatesPath) {
    this.templatesPath = templatesPath;

    this.generateFiles = this.generateFiles.bind(this);
  }

  generateFiles(templateFiles) {
    let files = [];
    for (let i = 0; i < templateFiles.length; i++) {
      const templateFile = templateFiles[i];
      const contents = getFileTemplateContents(this.templatesPath, templateFile);
  
      files.push(new File(templateFile.outputFileName, templateFile.outputDir, contents));
    }
  
    return files;
  }
}

class File {
  constructor(fileName, dir, contents) {
    this.fileName = fileName;
    this.dir = dir;
    this.contents = contents;
  }
}

const replaceTextVariables = (replaceArray, contents) => {
  for (let i = 0; i < replaceArray.length; i++){
    contents = contents.split(`<<${i}>>`).join(replaceArray[i]);
  }
  return contents;
}

const getFileTemplateContents = (templatesPath, templateFile) => {
  const filePath = path.join(templatesPath, templateFile.templateFileName);
  let contents = fs.readFileSync(filePath).toString('utf-8');

  if (templateFile.contentVariables) {
     contents = replaceTextVariables(templateFile.contentVariables, contents);
  }

  return contents;
}

module.exports = FileGenerator;