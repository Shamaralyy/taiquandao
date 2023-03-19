"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  Race();
}
const Race = () => "./Race/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let selectData = common_vendor.reactive({
      // 下拉框选项
      comIndex: 0,
      comType: ["个人竞技", "团体竞技"],
      marIndex: 0,
      marArr: ["武馆1", "武馆2", "武馆3"]
    });
    let raceList = common_vendor.ref([]);
    function comPickerChange(e) {
      selectData.comIndex = e.detail.value;
    }
    function marPickerChange(e) {
      selectData.marIndex = e.detail.value;
    }
    common_vendor.onBeforeMount(() => {
      common_vendor.index.request({
        url: "https://cqshq.top/ShowMatchPlayers?mid=9999&winner=3",
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log("ShowMatchPlayers-res", JSON.parse(res.data));
          raceList.value = JSON.parse(res.data);
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(selectData).comType[common_vendor.unref(selectData).comIndex]),
        b: common_vendor.unref(selectData).comType,
        c: common_vendor.unref(selectData).comIndex,
        d: common_vendor.o(comPickerChange),
        e: common_vendor.t(common_vendor.unref(selectData).marArr[common_vendor.unref(selectData).marIndex]),
        f: common_vendor.unref(selectData).marArr,
        g: common_vendor.unref(selectData).marIndex,
        h: common_vendor.o(marPickerChange),
        i: common_vendor.f(common_vendor.unref(raceList), (item, index, i0) => {
          return {
            a: {
              index
            },
            b: "da66ce72-0-" + i0,
            c: common_vendor.p({
              msg: {
                index,
                ...item
              }
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da66ce72"], ["__file", "D:/刘懿莹/框架/vue/taiquandao/tqd/pages/core/medal/index.vue"]]);
wx.createPage(MiniProgramPage);
