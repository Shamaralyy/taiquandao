"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "caipanma",
  setup(__props) {
    let refereeCode = common_vendor.ref(null);
    let account = common_vendor.ref(null);
    let password = common_vendor.ref(null);
    let message = common_vendor.ref();
    let msgType = common_vendor.ref("success");
    let messageText = common_vendor.ref("这是一条成功提示");
    common_vendor.onLoad((options) => {
      account.value = options.account;
      password.value = options.password;
    });
    function toCaipan() {
      if (refereeCode.value === null) {
        messageToggle("warn", "请输入裁判码");
      } else {
        common_vendor.index.request({
          url: "https://cqshq.top/JudgeCodeTest",
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            id: account.value,
            code: password.value,
            mid: refereeCode.value
          }
        });
        common_vendor.index.navigateTo({
          url: "/pages/judge/caipan"
        });
      }
    }
    function messageToggle(type, content) {
      msgType.value = type;
      messageText.value = `${content}`;
      message.value.open();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(refereeCode),
        b: common_vendor.o(($event) => common_vendor.isRef(refereeCode) ? refereeCode.value = $event.detail.value : refereeCode = $event.detail.value),
        c: common_vendor.o(toCaipan),
        d: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        e: common_vendor.sr(message, "a3380fde-0", {
          "k": "message"
        }),
        f: common_vendor.p({
          type: "message"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/刘懿莹/框架/vue/taiquandao/tqd/pages/core/judge/caipanma.vue"]]);
wx.createPage(MiniProgramPage);
