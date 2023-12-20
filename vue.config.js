
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_NET === 'dev'
      ? '/'
      : '/'
    : '/';
console.log('BASE_URL = ', BASE_URL);
module.exports = {
  publicPath: BASE_URL,
  productionSourceMap:false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
        "console.log"
      ];
    }
  },
  transpileDependencies:[
    'vant',
    'pinia',
    'web3',
    'web3modal',
    'tronweb',
    'fortmatic',
    'bitski',
    'authereum',
     /[/\\]node_modules[/\\](.+?)?vant(.*)[/\\]src/,
  /[/\\]node_modules[/\\](.+?)?vant(.*)[/\\]package/,],
  // configureWebpack: {
  //   // https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
  //   // plugins: [new NodePolyfillPlugin()],
  // },
};
