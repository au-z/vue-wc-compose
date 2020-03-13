/* eslint-disable no-console */

/**
 * Builds a component as a reusable JS component for use with vue-custom-element
 * Flags:
 * --source: The source .vue component path relative to the project root
 * --profile: Generate bundle analysis
 */
const path = require('path');
const argv = require('yargs').argv;
const webpackConfig = require('./webpack.config.js');

const BuildTools = require('../../src/BuildTools.js');

process.env.NODE_ENV = 'development';

console.log(`
/------------------------------------\\
Component Build
\\------------------------------------/
`);

BuildTools.build(webpackConfig, argv.source ? [argv.source] : [
	{name: 'wc-test', path: path.resolve(__dirname, './wc-test.wrapper.js'), libraryExport: 'default'},
]);