const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

/*
Paths
*/

const { PATHS } = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

const pathPublic = path.resolve(PATHS.public);
const pathComponents = path.resolve(PATHS.components);
const pathFoundation = path.resolve(__dirname, 'node_modules/foundation-sites');

const baseConfig = {
    entry: {
        app: [
            pathPublic + '/js/app/app.js'
        ],
        vendor: [
            pathPublic + '/js/vendor/vendor.js'
        ]
    },
    output: {
        path: pathPublic + '/js/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                // exclude: /node_modules/,
                include: [
                    pathFoundation,
                    pathPublic,
                    pathComponents
                ],
                loader: "babel-loader",
                options: {
                    presets: ['env']
                  }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
            ,
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: []
}

const devConfig = Object.assign({}, baseConfig);

const prodConfig = Object.assign({}, baseConfig);
prodConfig.plugins = [
    new UglifyJsPlugin()
]

module.exports = {
    dev: devConfig,
    prod: prodConfig
}
