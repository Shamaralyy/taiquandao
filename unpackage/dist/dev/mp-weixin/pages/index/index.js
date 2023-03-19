"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let message = common_vendor.ref();
    let msgType = common_vendor.ref("success");
    let messageText = common_vendor.ref("这是一条成功提示");
    function toTaiquandao() {
      common_vendor.index.navigateTo({
        url: "/pages/core/taekwondo/index"
      });
    }
    common_vendor.onMounted(() => {
      if (!common_vendor.wx$1.getStorageSync("openid"))
        common_vendor.index.setStorageSync("isLogin", false);
      else {
        common_vendor.index.request({
          url: "https://cqshq.top/Login?id=" + common_vendor.index.getStorageSync("openid"),
          header: {
            "Content-Type": "application/json"
          },
          success: (res) => {
            console.log("Login-res", res);
            if (res.statusCode === 404) {
              common_vendor.index.clearStorageSync();
              common_vendor.index.setStorageSync("isLogin", false);
            } else {
              common_vendor.index.setStorageSync("userInfo", res.data);
              common_vendor.index.setStorageSync("type", res.data.character);
              common_vendor.index.setStorageSync("isLogin", true);
            }
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toTaiquandao),
        b: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        c: common_vendor.sr(message, "612caa78-0", {
          "k": "message"
        }),
        d: common_vendor.p({
          type: "message"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/刘懿莹/框架/vue/taiquandao/tqd/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
