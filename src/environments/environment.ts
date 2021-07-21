// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  appVersion: require('../../package.json').version,// + '-dev',
  serverAddress: 'https://server.qld.everest40.com',
  appKey: "EAAFc0IurJEcBAEGV9Nm7Pn2xMrymLusKT6NVW7zPj5klUDeXCaqOrNZAyvuXhyoLTKq5iFGoHJYgXo5765EzMtRYgpDJAubWrQP1rT46FgKqx3Ho4WX8x1DWXAnEWu0oBZBm56rdhV961s4TrSkPzCEBsNrMBHbuOWzTByPJuxniGzGlOLZA5ZBWvFrPJfpSvPl6XFmk7AZDZD",
  production: false
};
