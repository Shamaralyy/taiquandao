"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  props: {
    msg: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.msg.winner === 0
      }, __props.msg.winner === 0 ? {
        b: common_vendor.t(__props.msg.index + 1),
        c: __props.msg.pic1,
        d: common_vendor.t(__props.msg.name1),
        e: common_vendor.t(__props.msg.sex1 === 1 ? "男" : "女"),
        f: common_vendor.t(__props.msg.year1),
        g: common_vendor.t(__props.msg.weight1),
        h: common_vendor.t(__props.msg.org1),
        i: __props.msg.pic2,
        j: common_vendor.t(__props.msg.name2),
        k: common_vendor.t(__props.msg.sex2 === 2 ? "男" : "女"),
        l: common_vendor.t(__props.msg.year2),
        m: common_vendor.t(__props.msg.weight2),
        n: common_vendor.t(__props.msg.org2)
      } : {}, {
        o: __props.msg.winner === 1
      }, __props.msg.winner === 1 ? {
        p: common_vendor.t(__props.msg.index + 1),
        q: __props.msg.pic1,
        r: common_vendor.t(__props.msg.name1),
        s: common_vendor.t(__props.msg.sex1 === 1 ? "男" : "女"),
        t: common_vendor.t(__props.msg.year1),
        v: common_vendor.t(__props.msg.weight1),
        w: common_vendor.t(__props.msg.org1),
        x: __props.msg.pic2,
        y: common_vendor.t(__props.msg.name2),
        z: common_vendor.t(__props.msg.sex2 === 1 ? "男" : "女"),
        A: common_vendor.t(__props.msg.year2),
        B: common_vendor.t(__props.msg.weight2),
        C: common_vendor.t(__props.msg.org2)
      } : {}, {
        D: __props.msg.winner === 2
      }, __props.msg.winner === 2 ? {
        E: common_vendor.t(__props.msg.index + 1),
        F: __props.msg.pic1,
        G: common_vendor.t(__props.msg.name2),
        H: common_vendor.t(__props.msg.sex2 === 1 ? "男" : "女"),
        I: common_vendor.t(__props.msg.year2),
        J: common_vendor.t(__props.msg.weight2),
        K: common_vendor.t(__props.msg.org2),
        L: __props.msg.pic2,
        M: common_vendor.t(__props.msg.name1),
        N: common_vendor.t(__props.msg.sex1 === 1 ? "男" : "女"),
        O: common_vendor.t(__props.msg.year1),
        P: common_vendor.t(__props.msg.weight1),
        Q: common_vendor.t(__props.msg.org1)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c7d0c88d"], ["__file", "D:/code/vue3/taiquandao/pages/core/medal/Race/index.vue"]]);
wx.createComponent(Component);
