"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let n = common_vendor.ref(1);
    let gjs = common_vendor.ref([]);
    let xss = common_vendor.ref([]);
    let djs = common_vendor.ref([]);
    function toLowerReq(racelist, type) {
      let id = racelist.value[racelist.value.length - 1].id;
      common_vendor.index.request({
        url: "https://cqshq.top/SendGamesInfo?id=" + id + "&type=" + type,
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          racelist.value.push(res.data);
        }
      });
    }
    function handleToLower() {
      if (n.value === 1) {
        toLowerReq(gjs, 3);
      }
      if (n.value === 2) {
        toLowerReq(xss, 1);
      }
      if (n.value === 3) {
        toLowerReq(djs, 2);
      }
    }
    function toDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/core/detail/index?id=" + item.id
      });
    }
    const showList = () => {
      common_vendor.index.request({
        url: "https://cqshq.top/SendGamesInfo?type=3&id=0",
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log("race3-res", JSON.parse(res.data));
          gjs.value = JSON.parse(res.data);
        }
      });
      common_vendor.index.request({
        url: "https://cqshq.top/SendGamesInfo?type=1&id=0",
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log("race1-res", JSON.parse(res.data));
          xss.value = JSON.parse(res.data);
        }
      });
      common_vendor.index.request({
        url: "https://cqshq.top/SendGamesInfo?id=0&type=2",
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log("race2-res", JSON.parse(res.data));
          djs.value = JSON.parse(res.data);
        }
      });
    };
    showList();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(n) ? n.value = 1 : n = 1),
        b: common_vendor.unref(n) == 1 ? "gray" : "",
        c: common_vendor.o(($event) => common_vendor.isRef(n) ? n.value = 2 : n = 2),
        d: common_vendor.unref(n) == 2 ? "gray" : "",
        e: common_vendor.o(($event) => common_vendor.isRef(n) ? n.value = 3 : n = 3),
        f: common_vendor.unref(n) == 3 ? "gray" : "",
        g: common_vendor.f(common_vendor.unref(gjs), (item, k0, i0) => {
          return common_vendor.e({
            a: item.logo,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.type),
            d: common_vendor.t(item.startTime),
            e: common_vendor.t(item.address),
            f: common_vendor.t(item.ContactsTel),
            g: item.remainingDays > 0
          }, item.remainingDays > 0 ? {} : {}, {
            h: common_vendor.o(($event) => toDetail(item), item),
            i: item
          });
        }),
        h: common_vendor.o(handleToLower),
        i: common_vendor.unref(n) == 1,
        j: common_vendor.f(common_vendor.unref(xss), (item, k0, i0) => {
          return common_vendor.e({
            a: item.logo,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.type),
            d: common_vendor.t(item.startTime),
            e: common_vendor.t(item.address),
            f: common_vendor.t(item.ContactsTel),
            g: item.remainingDays > 0
          }, item.remainingDays > 0 ? {} : {}, {
            h: common_vendor.o(($event) => toDetail(item), item.id),
            i: item.id
          });
        }),
        k: common_vendor.o(handleToLower),
        l: common_vendor.unref(n) == 2,
        m: common_vendor.f(common_vendor.unref(djs), (item, k0, i0) => {
          return common_vendor.e({
            a: item.logo,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.type),
            d: common_vendor.t(item.startTime),
            e: common_vendor.t(item.address),
            f: common_vendor.t(item.ContactsTel),
            g: item.remainingDays > 0
          }, item.remainingDays > 0 ? {} : {}, {
            h: common_vendor.o(($event) => toDetail(item), item.id),
            i: item.id
          });
        }),
        n: common_vendor.o(handleToLower),
        o: common_vendor.unref(n) == 3
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-29595183"], ["__file", "D:/code/vue3/taiquandao/pages/core/taekwondo/index.vue"]]);
wx.createPage(MiniProgramPage);
