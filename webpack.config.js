var webpack = require("webpack");

module.exports = {
	entry: {
		app: "./client/assets/scripts/app.jsx"
    },
    
	output: {
		path: __dirname + "/client/dist",
		filename: "[name]-bundle.min.js"
    },
    
    watch: true,
    
	module: {
		loaders: [
			{
				loader: "babel-loader",
				test: /\.js$|\.jsx$/,
				exclude: /node_modules/,
				query: {
					presets: ["es2015", "react"]
				}
			}
		]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true
		}),

		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		})
	]
};