var path = require('path');
 
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.jsx'
    },
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    mode: 'none',
    module: {
        rules: [ 
            {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-env', '@babel/preset-react' ]
                }
            }
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, { 
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: [ 'url-loader' ] 
        }, { 
            test: /\.(eot|svg|ttf|woff|woff2)$/, 
            use: ['file-loader'], 
        }

    ]   //rules end
    }   //module end
    
};