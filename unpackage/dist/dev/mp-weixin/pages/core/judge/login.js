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
  __name: "login",
  setup(__props) {
    let data = common_vendor.ref({
      current: 1,
      counting: false
    });
    let message = common_vendor.ref();
    let msgType = common_vendor.ref("success");
    let messageText = common_vendor.ref("这是一条成功提示");
    common_vendor.ref({
      name: "",
      phone: null,
      IDcard: null,
      password: null,
      confirm: null
    });
    let log = common_vendor.ref({
      account: "",
      password: null
    });
    function click(e) {
      let index = e.currentTarget.dataset.code;
      data.value.current = index;
      console.log("data.value", data.value.current);
    }
    function login() {
      console.log("账号：", log.value.account);
      console.log("密码：", log.value.password);
      if (log.value.account === "" || log.value.password === null) {
        messageToggle("warn", "请输入完整的信息");
      } else {
        messageToggle("success", "登录成功");
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/judge/caipanma?account=" + log.value.account + "&password=" + log.value.password
          });
        }, 250);
      }
    }
    function messageToggle(type, content) {
      msgType.value = type;
      messageText.value = `${content}`;
      message.value.open();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(common_vendor.unref(data).current == 1 ? "select" : ""),
        b: common_vendor.o(click),
        c: common_vendor.unref(data).current == 1
      }, common_vendor.unref(data).current == 1 ? {
        d: common_vendor.unref(log).account,
        e: common_vendor.o(($event) => common_vendor.unref(log).account = $event.detail.value),
        f: common_vendor.unref(log).password,
        g: common_vendor.o(($event) => common_vendor.unref(log).password = $event.detail.value)
      } : {}, {
        h: common_vendor.unref(data).current == 1
      }, common_vendor.unref(data).current == 1 ? {
        i: common_vendor.o(login)
      } : {}, {
        j: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        k: common_vendor.sr(message, "68aad96b-0", {
          "k": "message"
        }),
        l: common_vendor.p({
          type: "message"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/vue3/taiquandao/pages/core/judge/login.vue"]]);
wx.createPage(MiniProgramPage);
