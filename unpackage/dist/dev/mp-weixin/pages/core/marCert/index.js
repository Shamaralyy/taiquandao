"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_utils = require("../../../utils/utils.js");
const common_assets = require("../../../common/assets.js");
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
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    let msg = common_vendor.reactive({
      marName: "",
      name: "",
      phone: null,
      address: "",
      IDcard: null,
      marInfo: ""
    });
    let logo = common_vendor.ref("");
    let logoSrc = common_vendor.ref("https://img-qn.51miz.com/Element/00/41/38/39/407da9aa_E413839_a95d89b1.png");
    let baseLogo = common_vendor.ref("");
    let sfzUp_pic = common_vendor.ref("");
    let sfzUp_picSrc = common_vendor.ref(common_assets.upSrc);
    let base_sfzUp_pic = common_vendor.ref("");
    let sfzDown_pic = common_vendor.ref("");
    let sfzDown_picSrc = common_vendor.ref(common_assets.downSrc);
    let base_sfzDown_pic = common_vendor.ref("");
    let yyzz_pic = common_vendor.ref("");
    let base_yyzz_pic = common_vendor.ref("");
    let message = common_vendor.ref();
    let msgType = common_vendor.ref("success");
    let messageText = common_vendor.ref("这是一条成功提示");
    async function submit() {
      if (logo.value || sfzUp_pic.value || sfzDown_pic.value || yyzz_pic.value) {
        const base64_logo = await common_vendor.pathToBase64(logo.value);
        baseLogo.value = base64_logo;
        const base64_up = await common_vendor.pathToBase64(sfzUp_pic.value);
        base_sfzUp_pic.value = base64_up;
        const base64_down = await common_vendor.pathToBase64(sfzDown_pic.value);
        base_sfzDown_pic.value = base64_down;
        await common_vendor.pathToBase64(yyzz_pic.value);
        base_yyzz_pic.value = base64_down;
      }
      if (msg.marName === "" || msg.name === "" || msg.phone === "" || baseLogo.value === "" || base_sfzUp_pic.value === "" || msg.address === "" || base_yyzz_pic.value === "" || msg.IDcard === "请选择出生日期" || msg.marInfo === "" || base_sfzDown_pic.value === "") {
        messageToggle("error", "请确保信息填写完整!");
      } else {
        if (utils_utils.testReg("name", msg.name) && utils_utils.testReg("IDcard", msg.IDcard) && utils_utils.testReg("phone", msg.phone)) {
          common_vendor.index.request({
            url: "https://cqshq.top/GetOrgsInfo",
            method: "POST",
            header: {
              "Content-Type": "application/json"
            },
            data: {
              "id": String(store.state.userInfo.openid.substring(store.state.userInfo.openid.length - 6)),
              "name": String(msg.marName),
              "address": String(msg.address),
              "user_id": store.state.userInfo.openid,
              "contactsName": String(msg.name),
              "contactsTel": String(msg.phone),
              "contactsIdCard": String(msg.IDcard),
              "info": String(msg.marInfo),
              "yyzz_pic": base_yyzz_pic.value.slice(22),
              "filename_yyzz": "yyzz",
              "sfzUp_pic": base_sfzUp_pic.value.slice(22),
              "filename_sfzUp": "sfzUp",
              "sfzDown_pic": base_sfzDown_pic.value.slice(22),
              "filename_sfzDown": "sfzDown",
              "icon": baseLogo.value.slice(22),
              "filename_icon": "icon"
            }
          });
          store.state.isLogin = true;
          messageToggle("success", "提交成功");
        } else {
          messageToggle("error", "请确保姓名、身份证号、联系电话输入正确！");
        }
      }
    }
    function upload() {
      processImg(logo, logoSrc, baseLogo);
    }
    function front_upload() {
      processImg(sfzUp_pic, sfzUp_picSrc, base_sfzUp_pic);
    }
    function verso_upload() {
      processImg(sfzDown_pic, sfzDown_picSrc, base_sfzDown_pic);
    }
    function last_upload() {
      processImg(yyzz_pic, yyzz_picSrc, base_yyzz_pic);
    }
    function processImg(img, imgSrc, base) {
      common_vendor.wx$1.chooseImage({
        count: 1,
        // 默认9
        sizeType: ["original", "compressed"],
        // 指定是原图还是压缩图，默认两个都有
        sourceType: ["album", "camera"],
        // 指定来源是相册还是相机，默认两个都有
        success: function(res) {
          img.value = res.tempFilePaths[0];
          imgSrc.value = res.tempFilePaths[0];
          common_vendor.wx$1.compressImage(
            {
              src: res.tempFilePaths[0],
              // 图片路径
              success: (res2) => {
                common_vendor.pathToBase64(res2.tempFilePath).then((base64) => {
                  base.value = base64;
                });
              },
              fail: (err) => {
                console.log("compress-err", err);
              }
            }
          );
        }
      });
    }
    function map() {
      common_vendor.wx$1.chooseLocation({
        success: function(res) {
          msg.address = res.address + res.name;
        },
        fail: function() {
        },
        complete: function() {
        }
      });
    }
    function messageToggle(type, content) {
      msgType.value = type;
      messageText.value = `${content}`;
      message.value.open();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(logoSrc),
        b: common_vendor.o(upload),
        c: common_vendor.unref(msg).marName,
        d: common_vendor.o(($event) => common_vendor.unref(msg).marName = $event.detail.value),
        e: common_vendor.unref(msg).name,
        f: common_vendor.o(($event) => common_vendor.unref(msg).name = $event.detail.value),
        g: common_vendor.unref(msg).phone,
        h: common_vendor.o(($event) => common_vendor.unref(msg).phone = $event.detail.value),
        i: common_vendor.o(map),
        j: common_vendor.unref(msg).address,
        k: common_vendor.o(($event) => common_vendor.unref(msg).address = $event.detail.value),
        l: common_vendor.unref(msg).IDcard,
        m: common_vendor.o(($event) => common_vendor.unref(msg).IDcard = $event.detail.value),
        n: common_vendor.unref(msg).marInfo,
        o: common_vendor.o(($event) => common_vendor.unref(msg).marInfo = $event.detail.value),
        p: common_vendor.unref(sfzUp_picSrc),
        q: common_vendor.o(front_upload),
        r: common_vendor.unref(sfzDown_picSrc),
        s: common_vendor.o(verso_upload),
        t: common_vendor.o(last_upload),
        v: common_vendor.o(submit),
        w: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        x: common_vendor.sr(message, "77d0a99f-0", {
          "k": "message"
        }),
        y: common_vendor.p({
          type: "message"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/vue3/taiquandao/pages/core/marCert/index.vue"]]);
wx.createPage(MiniProgramPage);
