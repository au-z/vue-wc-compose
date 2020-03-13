module.exports = function(api) {
	api.cache(true)

	return {
		presets: [
			['@babel/preset-env', {
				'useBuiltIns': 'usage',
				'corejs': 3,
				// 'debug': true,
			}],
			'@babel/preset-typescript',
		],
	}
};
