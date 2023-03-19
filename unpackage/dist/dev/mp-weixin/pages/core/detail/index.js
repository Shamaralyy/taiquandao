"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_popup_message)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const id = common_vendor.ref();
    const name = common_vendor.ref();
    const type = common_vendor.ref();
    const address = common_vendor.ref();
    const info = common_vendor.ref();
    const startTime = common_vendor.ref();
    const endTime = common_vendor.ref();
    const competeTime = common_vendor.ref();
    const ContactsTel = common_vendor.ref();
    const remainingDays = common_vendor.ref();
    const sponsor = common_vendor.ref([]);
    const password = common_vendor.ref(common_vendor.index.getStorageSync("password"));
    const inputDialog = common_vendor.ref();
    let data = {
      id: "",
      announcement: "",
      rule: "",
      name: "",
      address: "",
      startTime: "",
      endTime: ""
    };
    let message = common_vendor.ref();
    let msgType = common_vendor.ref("success");
    let messageText = common_vendor.ref("这是一条成功提示");
    function messageToggle(type2, content) {
      msgType.value = type2;
      messageText.value = `${content}`;
      message.value.open();
    }
    function navToEnroll(hasPsw) {
      console.log("password.value", password.value);
      let enrollObj = {
        id: id.value,
        password: password.value,
        data,
        hasPsw
      };
      console.log("enrollObj", enrollObj);
      common_vendor.index.setStorageSync("enrollObj", enrollObj);
      common_vendor.index.navigateTo({
        url: "/pages/core/enroll/index?id=" + encodeURIComponent(JSON.stringify(id.value)) + "&password=" + encodeURIComponent(JSON.stringify(password.value)) + "&data=" + encodeURIComponent(JSON.stringify(data)) + "&hasPsw=" + hasPsw
      });
    }
    function toScore() {
      common_vendor.index.navigateTo({
        url: "/pages/core/race/index"
      });
    }
    function toEnroll(flag) {
      if (flag) {
        if (common_vendor.index.getStorageSync("isLogin")) {
          inputDialog.value.open();
        } else {
          messageToggle("warn", "请先登录!");
        }
      } else
        navToEnroll(0);
    }
    function dialogInputConfirm(val) {
      if (val.length !== 6) {
        messageToggle("warn", "请输入六位数密码！");
      } else {
        if (password.value == val) {
          setTimeout(() => {
            navToEnroll(1);
          }, 100);
        } else {
          console.log("password.value", password.value);
          console.log("val", val);
          messageToggle("error", "密码错误!");
        }
      }
    }
    function toMedal() {
      common_vendor.index.navigateTo({
        url: "/pages/core/medal/index"
      });
    }
    common_vendor.onLoad((options) => {
      id.value = options.id;
      data.id = id.value;
    });
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: "https://cqshq.top/SendGamesDetails?id=" + id.value,
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log("SendGamesDetails-res", JSON.parse(res.data));
          name.value = JSON.parse(res.data).name;
          type.value = JSON.parse(res.data).type;
          address.value = JSON.parse(res.data).address;
          info.value = JSON.parse(res.data).info;
          startTime.value = JSON.parse(res.data).startTime;
          endTime.value = JSON.parse(res.data).endTime;
          competeTime.value = JSON.parse(res.data).competeTime;
          ContactsTel.value = JSON.parse(res.data).ContactsTel;
          remainingDays.value = JSON.parse(res.data).remainingDays;
          JSON.parse(res.data).sponsor.split("\n").forEach((item, index) => {
            sponsor.value.push(item);
          });
          data.announcement = JSON.parse(res.data).announcement;
          data.rule = JSON.parse(res.data).rule;
          data.name = JSON.parse(res.data).name;
          data.address = JSON.parse(res.data).address;
          data.startTime = JSON.parse(res.data).startTime;
          data.endTime = JSON.parse(res.data).endTime;
          common_vendor.index.setStorageSync("password", JSON.parse(res.data).psw);
          password.value = JSON.parse(res.data).psw;
          console.log("password111", password.value);
        }
      });
      console.log("password.value", password.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(name.value),
        b: common_vendor.t(type.value),
        c: common_vendor.t(info.value),
        d: common_vendor.t(remainingDays.value),
        e: common_vendor.o(($event) => toEnroll(0)),
        f: common_vendor.o(($event) => toEnroll(1)),
        g: common_vendor.o(toMedal),
        h: common_vendor.o(toScore),
        i: common_vendor.t(competeTime.value),
        j: common_vendor.t(startTime.value),
        k: common_vendor.t(endTime.value),
        l: common_vendor.t(address.value),
        m: common_vendor.t(ContactsTel.value),
        n: common_vendor.f(sponsor.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        o: common_vendor.sr("inputClose", "5da7b767-1,5da7b767-0"),
        p: common_vendor.o(dialogInputConfirm),
        q: common_vendor.p({
          mode: "input",
          title: "报名密码",
          placeholder: "请输入报名密码(6位数) "
        }),
        r: common_vendor.sr(inputDialog, "5da7b767-0", {
          "k": "inputDialog"
        }),
        s: common_vendor.p({
          type: "dialog"
        }),
        t: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        v: common_vendor.sr(message, "5da7b767-2", {
          "k": "message"
        }),
        w: common_vendor.p({
          type: "message"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/刘懿莹/框架/vue/taiquandao/tqd/pages/core/detail/index.vue"]]);
wx.createPage(MiniProgramPage);
