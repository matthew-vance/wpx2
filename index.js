#!/usr/bin/env node
'use strict';

const program = require('commander'),
  inquirer = require('inquirer'),
  chalk = require('chalk'),
  fs = require('fs'),
  path = require('path'),
  rimraf = require('rimraf'),
  exec = require('child_process').execSync,
  TemplateFile = require('./models/templateFile'),
  FileGenerator = require('./fileGenerator'),
  FileWriter = require('./fileWriter');

let templatesPath,
  outputPath,
  generator,
  writer;

let generateFolders = () => {
  fs.mkdirSync(outputPath);
  fs.mkdirSync(path.join(outputPath, 'src'));
  fs.mkdirSync(path.join(outputPath, 'src', 'js'));
  fs.mkdirSync(path.join(outputPath, 'src', 'styles'));
}

let createDirectory = async () => {
  if (!fs.existsSync(outputPath)) {
    generateFolders();
  } else {
    await inquirer.prompt([{
      type: 'confirm',
      default: false,
      name: 'overwrite',
      message: chalk.yellow(`The folder "${outputPath}" already exists. Would you like to overwrite it?`)
    }]).then(({ overwrite }) => {
      if (overwrite) {
        rimraf.sync(outputPath);
        generateFolders();
      }
      else {
        console.log(chalk.red(`Generation Aborted. Folder "${outputPath}" already exists.`))
        process.exit();
      }
    })
  }
}

let installDeps = folderDir => {
  exec(`cd ${folderDir} && npm install`,{stdio:[0,1,2]});
}

let promptForProxyUrl = async () => {
  return await inquirer.prompt([{
    type: 'input',
    name: 'proxyUrl',
    default: 'http://localhost:8080',
    message: chalk.yellow('Enter URL of WordPress instance for proxy -')
  }]).then(({ proxyUrl }) => {
    if (!proxyUrl) {
      console.log(chalk.red(`Generation Aborted. A proxy URL is required.`))
      process.exit();
    }
    return proxyUrl;
  });
}

let generate = async name => {
  
  const proxyUrl = await promptForProxyUrl();

  const templateFiles = [
    new TemplateFile('index.php', 'index.php', '.'),
    new TemplateFile('style.css', 'style.css', '.', [name]), //TODO: allow names with spaces and format to valid text domain
    new TemplateFile('functions.php', 'functions.php', '.', [name]), //TODO: allow names with spaces and format to valid function name
    new TemplateFile('header.php', 'header.php', '.'),
    new TemplateFile('footer.php', 'footer.php', '.'),
    new TemplateFile('package.json', 'package.json', '.', [name.toLowerCase()]), //TODO: allow names with spaces and format to valid package name
    new TemplateFile('webpack.config.js', 'webpack.config.js', '.', [name, proxyUrl]),
    new TemplateFile('index.js', 'index.js', 'src/js'),
    new TemplateFile('index.scss', 'index.scss', 'src/styles'),
    new TemplateFile('gitignore.txt', '.gitignore', '.')
  ];

  const files = generator.generateFiles(templateFiles);
  await createDirectory();
  writer.writeFiles(outputPath, files);

  installDeps(outputPath);
}

let init = name => {
  templatesPath = path.join(__dirname, '/templates');
  outputPath = path.join(process.cwd(), name);
  generator = new FileGenerator(templatesPath, outputPath);
  writer = new FileWriter();
}

let main = async name => {
  console.log(chalk.blue(`Generating theme "${name}"...`));

  init(name);
  await generate(name)
    .catch((err) => {
      console.log('Oops... something went wrong :(');
      console.log(chalk.red(err));
      process.exit(1);
    });
  console.log(chalk.green(`Theme "${name}" successfully generated!`));
}

program
  .version('1.0.5')
  .command('new <name>')
  .description('Generate a new theme')
  .action(main);
program.parse(process.argv);

if (program.args.length === 0) program.help();
