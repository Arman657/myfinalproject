// const webpack = require('webpack');


// module.exports =function override(config){
//     const fallback = config.resolve.fallback || {};
    


//     Object.assign(fallback,{
        
//         zlib: require.resolve("browserify-zlib"),
//         querystring: require.resolve("querystring-es3"),
//         path: require.resolve("path-browserify"),
//         crypto: require.resolve("crypto-browserify"),
//         fs:false,
//         stream: require.resolve("stream-browserify"),
//         http: require.resolve("stream-http"),
//         net:false,
//         assert: require.resolve("assert/"),
//         process: require.resolve("process/browser"),
        
        



//     });
  
    

//     config.resolve.fallback = fallback;
//     config.resolve.extensions = [...config.resolve.extensions, '.mjs'];
//     config.plugins = (config.plugins || []).concat([
//         new webpack.ProvidePlugin({
//             process: "process/browser",
           
//         }),
        
        
//     ]);

//     return config;
// }


// const webpack = require('webpack');
// const process = require('process');
// module.exports = {
    

//     resolve: {
//       extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'], // Add mjs extension if missing
//       fallback: {
//         process: require.resolve('process/browser'),
//         zlib: require.resolve("browserify-zlib"),
//         querystring: require.resolve("querystring-es3"),
//         path: require.resolve("path-browserify"),
//         crypto: require.resolve("crypto-browserify"),
//         fs:false,
//         stream: require.resolve("stream-browserify"),
//         http: require.resolve("stream-http"),
//         net:false,
//         assert: require.resolve("assert/"),
      
        
       
//       },
//     },
//     plugins: [
//       new webpack.ProvidePlugin({
//         process: 'process/browser',
//       }),
//     ],
//   };
  

const webpack = require('webpack');

module.exports = {

    resolve: {
        alias: {
            stream: 'stream-browserify',
          process: 'process/browser', // Set process to point to the browser polyfill
        },
      },
  // Other configurations...
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', // Use the process polyfill for browsers
    }),
  ],
  
};
