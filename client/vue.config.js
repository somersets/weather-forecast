const path = require("path");
module.exports = {
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
