module.exports = {
    //watch: true,
    output: {
      publicPath: '/js/',
      pathinfo: true,
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            "presets": [
                ["@babel/preset-env", {
                  "targets": {
                    "esmodules": true
                  }
                }]
              ],
          }
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }
      ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '.'
        }
    }
  };