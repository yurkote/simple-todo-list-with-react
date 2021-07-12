const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


let conf = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
      publicPath: '/dist/'
   },
   devServer: {
      overlay: true
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
         },
         {
            test: /\.module\.css$/,
            use: [MiniCssExtractPlugin.loader, 
               {
                  loader: 'css-loader',
                  options: {
                     modules: {
                        localIdentName: '[local]__[sha1:hash:hex:7]'
                     }
                  }
               }
            ],
         },
         {
            test: /^((?!\.module).)*css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
         }
      ]
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: '[name].css'
      })
   ],
   optimization: {
      splitChunks: {
         cacheGroups: {
            vendors: {
               name: `chunk-vendors`,
               test: /[\\/]node_modules[\\/]/,
               priority: -10,
               chunks: 'initial'
            },
            common: {
               name: `chunk-common`,
               minChunks: 2,
               priority: -20,
               chunks: 'initial',
               reuseExistingChunk: true
            }
         }
      }
   }
};

module.exports = (env, options) => {
   let isProd = options.mode === 'production';

   conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
   conf.target = isProd ? 'browserslist' : 'web'; // настройка для того, чтобы не ломалася devserver, IE - не работает в dev режиме, только в build.
   // альтернативный вариант поставить webpack-dev-server 4 версии (beta)

   return conf;
}