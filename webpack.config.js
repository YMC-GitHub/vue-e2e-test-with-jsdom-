var path = require('path')
var webpack = require('webpack')
var path = require('path')
var vueLoaderOptions = {
	loaders: {
		css: [
			'vue-style-loader',
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
				},
			}
		],
		less: [
			'vue-style-loader',
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
				},
			},
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true,
				},
			},
			{
				loader: 'less-loader',
				options: {
					strictMath: true,
					strictUnits: true,
					ieCompat: true,
					sourceMap: true
				}
			}
		],
	},
	postLoaders: {
		html: 'babel-loader?sourceMap'
	},
	sourceMap: true,
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderOptions
			},
      {
        test: /\.js$/,
        loader: 'babel-loader',
				options: {
					sourceMap: true,
				},
        exclude: /node_modules/
      },
      {
        test: /\.(png|jp(e?)g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  mode:"development"
}

if (process.env.NODE_ENV === 'pro') {
  module.exports.devtool = '#source-map'
  module.exports.mode = "production"
}

// test specific setups
if (process.env.NODE_ENV === 'tes') {
  module.exports.externals = [require('webpack-node-externals')()]
  module.exports.devtool = 'eval'
  module.exports.mode = "production"
}
