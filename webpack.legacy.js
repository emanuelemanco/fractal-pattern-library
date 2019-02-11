module.exports = {
    // watch: true,
    output: {
      publicPath: '/js/',
      pathinfo: true,
      filename: '[name].es5.js',
      chunkFilename: '[name].[chunkhash].es5.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
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