var webpack = require('webpack'),
    path = require('path');

module.exports = {
   entry : "./engine/frontend/src/app/index.ts", 
   
   resolve : {
       modulesDirectories : [
           "./engine/frontend/src/"
       ],
       extensions : ['', '.ts', '.webpack.js', '.web.js', '.js']
   },
   
   output : {
       publicPath : './engine/frontend/built/app/',
       filename : 'app.min.js'
   },
   
    
   plugins : [
 /*    new webpack.ProvidePlugin({
         'angular' : 'node_modules/angular/angular.js' 
     })  */
   ],
   
   devtool : 'source-map',
   
   module : {
       
       loaders : [{
                    test: /\.ts$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel-loader?presets=es2015!webpack-typescript",
                    include:  path.resolve(__dirname, 'engine/frontend/src/')
                
                }],
            
            noParse : /\/node_modules\// 
   } 
   
};
