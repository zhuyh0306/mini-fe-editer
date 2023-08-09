import path from "path";
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      //配置路径别名
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
