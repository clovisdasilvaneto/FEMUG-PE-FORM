"use strict";

const path = './js/modules/';

module.exports = {
	entry: [path+"main.js"],
	output: {
		path: './js/dist',
		filename: 'bundle.js'
	},
	devServer: {
		inline: true,
		contentBase: './',
		port: 4000
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}]
	}
}