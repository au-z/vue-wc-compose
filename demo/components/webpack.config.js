const path = require('path');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

module.exports = {
	mode: 'development',
	entry: null, // set in component build
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: null, // set in component build
		library: null, // set in component build
		libraryTarget: 'umd',
		libraryExport: 'default',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					configFile: './babel.config.js',
				},
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.js', '.json', '.vue'],
	},
	plugins: [
		new VueLoaderPlugin(),
	],
};
