const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      // target: "https://capstone.twoapi.com/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // 将请求路径中的 '/api' 重写为空字符串
      },
    })
  );
};
