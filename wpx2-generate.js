#!/usr/bin/env node
'use strict';

const inquirer = require('inquirer'),
  chalk = require('chalk'),
  ThemeGenerator = require('./generators/themeGenerator'),
  PluginGenerator = require('./generators/pluginGenerator');

const main = async () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'generator',
      message: 'Select a generator...',
      choices: [
        'Theme',
        'Plugin'
      ]
    }
  ]).then(async answers => {
    switch (answers.generator) {
      case 'Theme':
        await ThemeGenerator.initialize();
        break;
      case 'Plugin':
        await PluginGenerator.initialize();
    }
  });
}

main().then(() => {
  console.log(chalk.green('Generation successful!'));
}).catch(err => {
  console.log('Oops... something went wrong :(');
  console.log(chalk.red(err));
  process.exit(1);
});