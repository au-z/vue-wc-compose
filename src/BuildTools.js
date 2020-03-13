const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

/**
 * Runs a specified webpack build on an array of component module roots
 * @param {Object} webpackConfig The base webpack configuration
 * @param {Array} components the components to build
 * @param {Function} buildFn the webpack build function
 */
function build(webpackConfig, components) {
	const configs = varyConfigurations(webpackConfig, components);

	webpack(configs, (err, stats) => {
		if(err) {
			throw err;
		}
		process.stdout.write(stats.toString({
			colors: true,
			errors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false,
		}) + '\n\n');
	});
}

/**
 * Varies a webpack configuration for each component
 * @param {Object} baseConfig the base webpack configuration
 * @param {Array} components array of build configurations
 * @return {Array} webpack configs
 */
function varyConfigurations(baseConfig, components) {
	return components.map((c) => {
		const library = c.name || path.basename(c.path, path.extname(c.path)).replace(' ', '_');
		console.log(`building ${library}...`);
		return merge.smart(baseConfig, {
			entry: c.path,
			output: {
				filename: library + '.js',
				library: library,
				libraryExport: c.libraryExport,
			},
		});
	});
}

module.exports = {
	build,
};
