var path = require('path');

module.exports = {
	entry: './index.jsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|build)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	externals: {
		'react': 'commonjs react'
	}
};
