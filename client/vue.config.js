const path = require("path");
module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "i18n/locales",
      enableInSFC: true,
      enableBridge: false,
    },
  },
  transpileDependencies: ["vuetify"],
  outputDir: path.resolve(__dirname, "../server/public"),
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~/public/scss/_variables.scss";
          @import "~/public/scss/main.scss";
        `,
      },
    },
  },
};
