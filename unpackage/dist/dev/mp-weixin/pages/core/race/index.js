"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_song_data_picker2 = common_vendor.resolveComponent("song-data-picker");
  _easycom_song_data_picker2();
}
const _easycom_song_data_picker = () => "../../../uni_modules/song-data-picker/components/song-data-picker/song-data-picker.js";
if (!Math) {
  _easycom_song_data_picker();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let n = common_vendor.ref(1);
    let marList = common_vendor.ref([]);
    function onchange(e) {
      e.detail.value;
    }
    function onnodeclick(node) {
    }
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: "https://cqshq.top/SendOrgsInfo",
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          let i = 1;
          let marlist = [];
          JSON.parse(res.data).forEach((item) => {
            marlist.push({
              "text": item.name,
              "value": (i++).toString()
            });
          });
          marList.value = marlist;
          console.log("marList.value1 ", marList.value);
        }
      });
      console.log("marList.value2", marList.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(n) ? n.value = 1 : n = 1),
        b: common_vendor.s(common_vendor.unref(n) === 1 ? "background-color:rgb(246,134,133);color: #fff;font-weight: 600;" : ""),
        c: common_vendor.o(($event) => common_vendor.isRef(n) ? n.value = 2 : n = 2),
        d: common_vendor.s(common_vendor.unref(n) === 2 ? "background-color:rgb(246,134,133);color: #fff;font-weight: 600;" : ""),
        e: common_vendor.o(($event) => common_vendor.isRef(n) ? n.value = 3 : n = 3),
        f: common_vendor.s(common_vendor.unref(n) === 3 ? "background-color:rgb(246,134,133);color: #fff;font-weight: 600;" : ""),
        g: common_vendor.o(($event) => common_vendor.isRef(n) ? n.value = 4 : n = 4),
        h: common_vendor.s(common_vendor.unref(n) === 4 ? "background-color:rgb(246,134,133);color: #fff;font-weight: 600;" : ""),
        i: common_vendor.o(($event) => common_vendor.isRef(n) ? n.value = 5 : n = 5),
        j: common_vendor.s(common_vendor.unref(n) === 5 ? "background-color:rgb(246,134,133);color: #fff;font-weight: 600;" : ""),
        k: common_vendor.o(onchange),
        l: common_vendor.o(onnodeclick),
        m: common_vendor.p({
          localdata: common_vendor.unref(marList),
          ["popup-title"]: "请选择武馆名称",
          openSearch: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/vue3/taiquandao/pages/core/race/index.vue"]]);
wx.createPage(MiniProgramPage);
