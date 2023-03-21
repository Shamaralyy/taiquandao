"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/rank/index.js";
  "./pages/me/index.js";
  "./pages/core/taekwondo/index.js";
  "./pages/core/detail/index.js";
  "./pages/core/enroll/index.js";
  "./pages/core/register/index.js";
  "./pages/core/msg/index.js";
  "./pages/core/race/index.js";
  "./pages/core/marCert/index.js";
  "./pages/core/judge/caipan.js";
  "./pages/core/judge/caipanma.js";
  "./pages/core/judge/login.js";
  "./pages/core/medal/index.js";
  "./uni_modules/uni-pay/pages/success/success.js";
  "./uni_modules/uni-pay/pages/ad-interactive-webview/ad-interactive-webview.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/vue3/taiquandao/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
