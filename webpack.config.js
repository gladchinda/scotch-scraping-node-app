const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SOURCE_PATH = path.join(__dirname, '/src');
const PUBLIC_PATH = path.join(__dirname, '/public/assets');

module.exports = {
	entry: path.resolve(SOURCE_PATH, "index.js"),

	output: {
		path: PUBLIC_PATH,
		filename: "js/bundle.js"
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				options: {
					presets: [["env", { targets: { browsers: ["last 2 versions"] } }]]
				},
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: { minimize: true }
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: [
									autoprefixer({ browsers: ["last 10 version", "ie >= 8"] })
								]
							}
						},
						"sass-loader"
					]
				})
			}
		]
	},

	plugins: [new ExtractTextPlugin("css/app.css")]
};
