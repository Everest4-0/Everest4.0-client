// ngcc.config.js
module.exports = {
    packages: {
      'ngx-openlayers': {
        ignorableDeepImportMatchers: [
          /ol\//,
        ]
      },
    },
  };