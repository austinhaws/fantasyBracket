const webpack = require('webpack');
const path = require('path');

// where does source live
const APP_DIR = path.resolve(__dirname, 'src/main/webapp/js/react');

// where does compiled code go
const BUILD_DIR = path.resolve(__dirname, 'src/main/webapp/js/bundles');

// tell it what file to starting compiling on and what to call it when done
const config = {
	entry: {
		app: APP_DIR + '/App.jsx',
	},
	output: {
		path: BUILD_DIR,
		filename: '[name].bundle.js'
	},

	// use babel loader
	module : {
		loaders : [
			{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel-loader'
			},
			{
				test : /\.js?/,
				include : /dts.*\.js?/,
				loader : 'babel-loader'
			}
		]
	},
};

module.exports = config;