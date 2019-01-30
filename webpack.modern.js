module.exports = {
    output: {
      filename: '[name].mjs',
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
      ],
    },
    optimization: {
         splitChunks: {
         chunks: 'all'
        }
    },
  };