const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
            test: /(\.ts)$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    externals: {
        sqlite3: 'commonjs sqlite3'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'README.md' },
                { from: 'LICENSE.md' },
                { from: 'CHANGELOG.md' },
                { from: 'package.json' }
            ]
        })
    ]
};