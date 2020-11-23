const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#2AA012',
              '@layout-header-background': '@primary-2',
              '@layout-footer-background': '@primary-2'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}