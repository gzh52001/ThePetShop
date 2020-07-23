/* config-overrides.js */
const path = require('path');
const { override, fixBabelImports, addBabelPlugins, addWebpackAlias, addPostcssPlugins } = require('customize-cra');

module.exports = override(
    addBabelPlugins(
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-syntax-dynamic-import'
    ),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css'
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
    }),
    addPostcssPlugins([require("postcss-px2rem")({ remUnit: 37.5 })])
);