#!/usr/bin/env node
'use strict';

const inquirer = require('inquirer'),
  chalk = require('chalk');

class PluginGenerator {
  async initialize() {
    console.log('The plugin generator has not yet been implemented.');
    process.exit();
  }
};

module.exports = new PluginGenerator();