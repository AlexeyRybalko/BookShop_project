const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },

    module: {
        rules: [
            {
                test: /.(png|svg|jpg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]',
                }
            },

            {
                test: /.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]',
                }
            },

            { 
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'] 
            },
        ]
    },

    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },

    performance: {
        hints: false,
    },

    plugins: [
        new MiniCssExtractPlugin(), 
        new HtmlWebpackPlugin({
            template: './index.html'
        }) 
    ],
};