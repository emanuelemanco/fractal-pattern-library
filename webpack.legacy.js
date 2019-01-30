module.exports = {
    output: {
      filename: '[name].es5.js',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false,
                useBuiltIns: "entry",
                targets: {
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'Firefox ESR',
                  ],
                },
              }],
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