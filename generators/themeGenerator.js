#!/usr/bin/env node
'use strict';

const inquirer = require('inquirer'),
  chalk = require('chalk');

class ThemeGenerator {
  async initialize() {
    console.log('Starting theme generator...');
    await inquirer.prompt([
      {
        type: 'input',
        name: 'themeName',
        message: 'What would you like to name your new theme?',
        validate: value => {
          if (value) {
            return true;
          }
          return 'Theme name is required'
        }
      }
    ]).then(({ themeName }) => {
      console.log(`Generating theme "${themeName}"...`)
    });
  }
};

module.exports = new ThemeGenerator();