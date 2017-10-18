const webpack = require('webpack');
const compileFiles = require('./compileFiles');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    resolve:{
        extensions:[".js", ".json", ".scss"]
    },
    entry: compileFiles,
    output: {
        filename: '[name]'
    },

    //devtool: "eval-source-map",
    devtool: "source-map",
    module: {

        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [["es2015", {"loose": true}], "stage-2"],
                    plugins: [
                        'transform-es3-member-expression-literals',
                        'transform-es3-property-literals'
                    ]
                }
            },{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },

    externals: {
        jquery: 'jQuery'
    },
    plugins: [

        /*new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            Bootstrap: 'bootstrap',
        }),*/
        // build optimization plugins
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].min.js',
        }),*/
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            },
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: "[name]",
            disable: process.env.NODE_ENV === "development"
        }),
        /*new ExtractTextPlugin({
            filename: 'build.min.css',
            allChunks: true,
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // compile time plugins
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        // webpack-dev-server enhancement plugins
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),*/
    ]
};