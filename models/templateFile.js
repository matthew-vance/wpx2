class TemplateFile {
  constructor(templateFileName, outputFileName, outputDir, contentVariables) {
    this.templateFileName = templateFileName;
    this.outputFileName = outputFileName;
    this.outputDir = outputDir;
    this.contentVariables = contentVariables;
  }
}

module.exports = TemplateFile;