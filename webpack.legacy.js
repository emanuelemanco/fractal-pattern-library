module.exports = {
    // watch: true,
    output: {
      filename: 'app.es5.js',
      chunkFilename: '[name].js',
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
};