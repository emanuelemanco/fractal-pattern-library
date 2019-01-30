module.exports = {
    //watch: true,
    output: {
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
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
    },
  };