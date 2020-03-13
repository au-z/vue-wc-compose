const path = require('path');
const mode = require('yargs').argv.mode;
const libraryName = 'vue-wc-compose';

const load = (regex, loader) => ({
	test: regex,
	loader,
	exclude: /node_modules/,
});

module.exports = {
	entry: path.resolve(__dirname, 'src/vue-wc-compose.js'),
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: libraryName + ((mode === 'production') ? '.min.js' : '.js'),
		library: libraryName,
		libraryTarget: 'umd',
		libraryExport: 'default',
		umdNamedDefine: true,
	},
	module: {
		rules: [
			load(/\.(j|t)s$/, 'babel-loader'),
		],
	},
	resolve: {
		extensions: ['.js', '.ts', '.json'],
	},
	optimization: {
		minimize: (mode === 'production'),
	},
};
