"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const type = common_vendor.ref(common_vendor.index.getStorageSync("type"));
    const userInfo = common_vendor.ref("");
    common_vendor.onMounted(() => {
      userInfo.value = common_vendor.index.getStorageSync("userInfo");
      console.log("type", type.value);
    });
    const changeMsg = () => {
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: type.value === 1
      }, type.value === 1 ? {
        b: userInfo.value.photo,
        c: common_vendor.t(userInfo.value.name),
        d: common_vendor.t(userInfo.value.org),
        e: common_vendor.o(changeMsg)
      } : {}, {
        f: type.value === 2
      }, type.value === 2 ? {
        g: userInfo.value.photo,
        h: userInfo.value.photo,
        i: userInfo.value.photo,
        j: userInfo.value.photo,
        k: userInfo.value.photo,
        l: userInfo.value.photo,
        m: userInfo.value.photo,
        n: common_vendor.o(changeMsg)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98c16092"], ["__file", "D:/code/vue3/taiquandao/pages/core/msg/index.vue"]]);
wx.createPage(MiniProgramPage);
