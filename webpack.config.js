const prod = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    mode: prod ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: prod ? '[name].[contenthash].js' : '[name].js',
        publicPath: '/',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: "esbuild-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader', 
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimize: prod,
    },
    devtool: prod ? 'source-map' : 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: prod ? { collapseWhitespace: true, removeComments: true } : false,
        }),
        new MiniCssExtractPlugin({
            filename: prod ? '[name].[contenthash].css' : '[name].css',
        }),
    ],
};