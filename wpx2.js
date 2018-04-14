#!/usr/bin/env node
'use strict';

const program = require('commander')

program
  .version('0.0.1 alpha')
  .command('generate', 'generate a theme or plugin initialized by wpx2').alias('g')
  .parse(process.argv);

  if (program.args.length === 0) program.help();