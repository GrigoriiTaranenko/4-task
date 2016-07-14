/**
 * Created by Sergey on 12.07.2016.
 */
var webpack = require('webpack');
module.exports = {
    entry: ["./main"],
    output: {
        path:__dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css-loader" }
        ]
    }
};
