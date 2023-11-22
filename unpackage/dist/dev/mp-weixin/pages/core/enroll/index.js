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
    let typeList = common_vendor.reactive([
      {
        id: 1,
        typename: "比赛规则",
        content: "1111111111111111"
      },
      {
        id: 2,
        typename: "比赛方式",
        content: "22222222222"
      },
      {
        id: 3,
        typename: "选择项目",
        content: "3"
      },
      {
        id: 4,
        typename: "费用缴纳",
        content: "4"
      }
    ]);
    let selindex = common_vendor.ref(0);
    common_vendor.ref("比赛名字比赛名字比赛名字");
    common_vendor.ref("比赛名字比赛名字比赛名字");
    common_vendor.ref("比赛名字比赛名字比赛名字");
    common_vendor.ref({
      nickName: "名字",
      organization: "登录查看组织",
      win: 0,
      lose: 0,
      points: 0
    });
    common_vendor.ref(common_vendor.index.getStorageSync("type"));
    let selectData = common_vendor.reactive({
      // 下拉框选项
      prefsIndex: 0,
      prefsArr: ["个人竞技", "个人品势"]
    });
    let selectData2 = common_vendor.reactive({
      // 下拉框选项
      prefsIndex: 0,
      prefsArr: ["个人竞技", "个人品势", "团队竞技", "团队品势"]
    });
    const firstPro = common_vendor.reactive({
      // 下拉框选项
      index: 0,
      arr: [
        "太极一章",
        "太极二章",
        "太极三章",
        "太极四章",
        "太极五章",
        "太极六章",
        "太极七章",
        "太极八章"
      ]
    });
    const secondPro = common_vendor.reactive({
      // 下拉框选项
      index: 0,
      arr: [
        "太极一章",
        "太极二章",
        "太极三章",
        "太极四章",
        "太极五章",
        "太极六章",
        "太极七章",
        "太极八章"
      ]
    });
    const enrollList = common_vendor.ref([]);
    let message = common_vendor.ref();
    let msgType = common_vendor.ref("success");
    let messageText = common_vendor.ref("这是一条成功提示");
    function messageToggle(type, content) {
      msgType.value = type;
      messageText.value = `${content}`;
      message.value.open();
    }
    const stuVal = common_vendor.ref("");
    const sourceStuList = common_vendor.ref([]);
    const stuList = common_vendor.ref(sourceStuList.value);
    function filterStu() {
      stuList.value = sourceStuList.value.filter(
        (item) => item.name.indexOf(stuVal.value) != -1
      );
    }
    let selStu = common_vendor.ref([]);
    const popup = common_vendor.ref();
    const popup2 = common_vendor.ref();
    const stuName = common_vendor.ref("");
    const stuIdx = common_vendor.ref(0);
    function addStu() {
      common_vendor.index.navigateTo({
        url: "/pages/core/register/index?addStu=" + true
      });
    }
    function enrollStu(item, index) {
      if (item === null && index === null) {
        if (selectData.prefsIndex == 0) {
          stuName.value = sourceStuList.value[stuIdx.value].name;
          popup.value.open();
        } else {
          popup2.value.open();
        }
      } else {
        stuIdx.value = index;
        if (selectData2.prefsIndex == 0 || selectData2.prefsIndex == 2) {
          if (item.state)
            item.state = false;
          else {
            selStu.value.push(item);
            stuName.value = sourceStuList.value[stuIdx.value].name;
            popup.value.open();
            weightIndex.value = index;
          }
        } else if (selectData2.prefsIndex == 1 || selectData2.prefsIndex == 3) {
          if (item.state)
            item.state = false;
          else {
            item.state = true;
            popup2.value.open();
          }
        }
      }
    }
    let infoP = common_vendor.ref({
      weight: 0
    });
    common_vendor.ref([]);
    let weightIndex = common_vendor.ref([]);
    let isWeightTrue = common_vendor.ref(false);
    function pswConfirm(val) {
      if (Number(val) > 0) {
        if (typeP.value === 1) {
          infoP.value.weight = Number(val).toFixed(1);
        } else if (typeP.value === 2) {
          isWeightTrue.value = true;
          sourceStuList.value[weightIndex.value].weight = Number(val).toFixed(1);
          sourceStuList.value[weightIndex.value].state = !sourceStuList.value[weightIndex.value].state;
        }
      } else {
        messageToggle("warn", "请输入正确的体重");
        isWeightTrue.value = false;
        sourceStuList.value[stuIdx.value].state = isWeightTrue.value;
        isWeightTrue.value = !isWeightTrue.value;
      }
    }
    function pickerChangeGR(e) {
      selectData.prefsIndex = e.detail.value;
      sourceStuList.value.map((item) => {
        item.state = false;
      });
    }
    function pickerChangeJL(e) {
      selectData2.prefsIndex = e.detail.value;
    }
    function propickerChangeGR(e) {
      firstPro.index = e.detail.value;
      sourceStuList.value[stuIdx.value].firstIdx = e.detail.value;
    }
    function proPickerChange2(e) {
      secondPro.index = e.detail.value;
      sourceStuList.value[stuIdx.value].secondIdx = e.detail.value;
    }
    let obj = common_vendor.ref();
    let goodsId = common_vendor.ref([]);
    let typeC = common_vendor.ref(0);
    const objArr = common_vendor.ref([]);
    function signUp(flag) {
      if (flag) {
        selindex.value = 2;
        enrollMsg.value = tmp_enrollMsg.value;
        goodsId.value = [
          Number(selectData.prefsIndex) + 1,
          Number(selectData.alternate1Index) + 1,
          Number(selectData.alternate2Index) + 1
        ];
      } else {
        const selectedStu = sourceStuList.value.filter(
          (item) => item.state === true
        );
        if (typeP.value === 1) {
          if (selectData.prefsIndex == 0) {
            if (infoP.value.weight > 0) {
              typeC.value = 1;
              objArr.value = [];
              objArr.value.push({
                id: common_vendor.index.getStorageSync("openid"),
                name: common_vendor.index.getStorageSync("userInfo").name,
                weight: Number(infoP.value.weight)
              });
              selindex.value = 3;
            } else {
              messageToggle("warn", "请输入正确的体重！");
            }
          } else if (selectData.prefsIndex == 1) {
            typeC.value = 2;
            objArr.value = [];
            objArr.value.push({
              id: common_vendor.index.getStorageSync("openid"),
              name: common_vendor.index.getStorageSync("userInfo").name,
              first: Number(firstPro.index) + 1,
              second: Number(secondPro.index) + 1
            });
          }
        } else if (typeP.value === 2) {
          typeC.value = 2;
          if (selectData2.prefsIndex == 0 || selectData2.prefsIndex == 2) {
            const selectedStu2 = sourceStuList.value.filter(
              (item) => item.state === true
            );
            objArr.value = [];
            selectedStu2.map((item) => {
              objArr.value.push({
                id: item.id,
                name: item.name,
                weight: Number(item.weight)
              });
            });
          } else if (selectData2.prefsIndex == 1 || selectData2.prefsIndex == 3) {
            typeC.value = 2;
            objArr.value = [];
            selectedStu.map((item) => {
              objArr.value.push({
                id: item.id,
                name: item.name,
                first: Number(item.firstIdx) + 1,
                second: Number(item.secondIdx) + 1
              });
            });
          }
        }
        if (objArr.value.length > 0) {
          obj.value = objArr.value;
          messageToggle("success", "添加成功！");
          enrollList.value = [];
          if (typeP.value === 1) {
            if (selectData.prefsIndex == 0) {
              enrollList.value.push({
                name: obj.value[0].name,
                avatarUrl: common_vendor.index.getStorageSync("userInfo").photo,
                weight: obj.value[0].weight,
                state: "未缴费"
              });
            } else if (selectData.prefsIndex == 1) {
              enrollList.value.push({
                name: obj.value[0].name,
                avatarUrl: common_vendor.index.getStorageSync("userInfo").photo,
                first: firstPro.arr[firstPro.index],
                second: secondPro.arr[secondPro.index],
                state: "未缴费"
              });
            }
          } else if (typeP.value === 2) {
            if (selectData2.prefsIndex == 0 || selectData2.prefsIndex == 2) {
              selectedStu.map((item) => {
                enrollList.value.push({
                  name: item.name,
                  avatarUrl: item.avatarUrl,
                  weight: item.weight,
                  state: "未缴费"
                });
              });
            } else if (selectData2.prefsIndex == 1 || selectData2.prefsIndex == 3) {
              selectedStu.map((item) => {
                enrollList.value.push({
                  name: item.name,
                  avatarUrl: item.avatarUrl,
                  first: firstPro.arr[item.first - 1],
                  second: secondPro.arr[item.second - 1],
                  state: "未缴费"
                });
              });
            }
          }
          selindex.value = 3;
        }
      }
    }
    function cancel(item, index) {
      sourceStuList.value.map((i) => {
        if (i.name === item.name) {
          i.state = false;
        }
      });
      enrollList.value.splice(index, 1);
    }
    const rules = common_vendor.ref([]);
    const announcements = common_vendor.ref([]);
    const name = common_vendor.ref();
    const addr = common_vendor.ref();
    const startTime = common_vendor.ref();
    const endTime = common_vendor.ref();
    const order_id = common_vendor.ref("");
    function orderCode() {
      order_id.value = "";
      for (var i = 0; i < 6; i++) {
        order_id.value += Math.floor(Math.random() * 10);
      }
      order_id.value = new Date().getTime() + order_id.value;
    }
    const price = common_vendor.ref(0.01);
    const suiji = common_vendor.ref(0);
    function pay() {
      orderCode();
      suiji.value = Math.floor(Math.random() * 1e8);
      common_vendor.Ds.callFunction({
        name: "getOrderInfo",
        data: {
          openid: common_vendor.index.getStorageSync("openid"),
          name: "测试",
          out_trade: order_id.value,
          //订单号
          suiji: suiji.value,
          pric: price.value * 100
        }
      }).then((odr) => {
        console.log("OrderInfo", odr);
        common_vendor.index.hideLoading();
        common_vendor.index.requestPayment({
          ...odr.result.orderInfo,
          success(res) {
            console.log("pay-success-res", res);
            common_vendor.index.showModal({
              title: "支付成功",
              content: "请和顾问联系执行订单即可！"
            });
            common_vendor.index.request({
              url: "https://cqshq.top/SelectGame?type=" + Number(typeC.value) + "&mid=" + Number(id.value),
              method: "POST",
              header: {
                "Content-Type": "application/json"
              },
              data: obj.value,
              success(res2) {
                console.log("报名成功-res", res2);
              }
            });
            common_vendor.index.request({
              url: "https://cqshq.top/WechatPayCallback",
              method: "POST",
              header: {
                "Content-Type": "application/json"
              },
              data: {
                age: 0,
                sex: 0,
                id: common_vendor.index.getStorageSync("openid"),
                name: common_vendor.index.getStorageSync("userInfo").name,
                birthdate: "2023-03-20T06:27:50.924Z",
                organization: common_vendor.index.getStorageSync("userInfo").org,
                idCardNumber: "string",
                joinInGold: 0,
                pic: "string",
                base64code1: "string",
                gd: [
                  {
                    gold_filename: "string",
                    base64code2: "string"
                  }
                ],
                amount: price.value,
                pay_id: order_id.value,
                weChat_pay_id: suiji.value
              },
              success(res2) {
                console.log("支付记录更新成功-res", res2);
              }
            });
            common_vendor.Ds.callFunction({
              name: "orderQuery",
              data: {
                outTradeNo: order_id.value
              }
            }).then((res2) => {
              console.log("orderQuery-res", res2);
            });
          },
          fail() {
          },
          complete(res) {
            console.log("pay-complete-res", res);
          }
        });
      });
    }
    const inputDialog = common_vendor.ref();
    const tmpIdx = common_vendor.ref();
    function changeSel(index) {
      tmpIdx.value = index;
      if (!common_vendor.index.getStorageSync("isLogin")) {
        if (index === 1 || index === 2 || index === 3) {
          messageToggle("warn", "请先登录!");
        }
      } else {
        if (hasPsw.value == 1) {
          selindex.value = index;
        } else {
          inputDialog.value.open();
        }
      }
    }
    function dialogInputConfirm(val) {
      if (val.length !== 6) {
        messageToggle("warn", "请输入六位数密码！");
      } else {
        if (password.value == val) {
          selindex.value = tmpIdx.value;
          hasPsw.value = true;
        } else {
          messageToggle("error", "密码错误!");
        }
      }
    }
    const id = common_vendor.ref();
    const password = common_vendor.ref();
    const hasPsw = common_vendor.ref(true);
    common_vendor.onLoad((options) => {
      if (options.selindex)
        selindex.value = options.selindex;
      if (common_vendor.index.getStorageSync("enrollObj")) {
        selindex.value = 0;
        hasPsw.value = common_vendor.index.getStorageSync("enrollObj").hasPsw;
        name.value = common_vendor.index.getStorageSync("enrollObj").data.name;
        addr.value = common_vendor.index.getStorageSync("enrollObj").data.address;
        startTime.value = common_vendor.index.getStorageSync("enrollObj").data.startTime;
        endTime.value = common_vendor.index.getStorageSync("enrollObj").data.endTime;
        id.value = common_vendor.index.getStorageSync("enrollObj").data.id;
        password.value = common_vendor.index.getStorageSync("enrollObj").password;
        common_vendor.index.getStorageSync("enrollObj").data.announcement.split("\n").forEach((item, index) => {
          announcements.value.push(item);
        });
        common_vendor.index.getStorageSync("enrollObj").data.rule.split("\n").forEach((item, index) => {
          rules.value.push(item);
        });
      }
    });
    const typeP = common_vendor.ref(2);
    const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo"));
    common_vendor.onMounted(() => {
      common_vendor.index.getStorageSync("openid");
      common_vendor.index.request({
        url: "https://cqshq.top/SendClassmates?org_id=" + common_vendor.index.getStorageSync("userInfo").org_id,
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          JSON.parse(res.data).forEach((item) => {
            sourceStuList.value.push({
              id: item.id,
              name: item.name,
              avatarUrl: item.pic,
              state: false,
              weight: 0,
              firstIdx: 0,
              secondIdx: 0
            });
          });
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(name.value),
        b: common_vendor.t(startTime.value),
        c: common_vendor.t(endTime.value),
        d: common_vendor.t(addr.value),
        e: common_vendor.f(common_vendor.unref(typeList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.typename),
            b: common_vendor.s(index === common_vendor.unref(selindex) ? "color:#050505" : ""),
            c: common_vendor.o(($event) => changeSel(index), index),
            d: index,
            e: common_vendor.s(index === common_vendor.unref(selindex) ? "background-color:#c5c5c5" : "")
          };
        }),
        f: 0 === common_vendor.unref(selindex)
      }, 0 === common_vendor.unref(selindex) ? {
        g: common_vendor.f(rules.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        h: common_vendor.f(announcements.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        })
      } : {}, {
        i: 1 === common_vendor.unref(selindex)
      }, 1 === common_vendor.unref(selindex) ? common_vendor.e({
        j: typeP.value === 1
      }, typeP.value === 1 ? {
        k: common_vendor.t(common_vendor.unref(selectData).prefsArr[common_vendor.unref(selectData).prefsIndex]),
        l: common_vendor.unref(selectData).prefsArr,
        m: common_vendor.unref(selectData).prefsIndex,
        n: common_vendor.o(pickerChangeGR)
      } : {}, {
        o: typeP.value === 2
      }, typeP.value === 2 ? {
        p: common_vendor.t(common_vendor.unref(selectData2).prefsArr[common_vendor.unref(selectData2).prefsIndex]),
        q: common_vendor.unref(selectData2).prefsArr,
        r: common_vendor.unref(selectData2).prefsIndex,
        s: common_vendor.o(pickerChangeJL)
      } : {}, {
        t: common_vendor.o(($event) => signUp(true))
      }) : {}, {
        v: 2 === common_vendor.unref(selindex)
      }, 2 === common_vendor.unref(selindex) ? common_vendor.e({
        w: typeP.value === 1
      }, typeP.value === 1 ? {
        x: userInfo.value.photo,
        y: common_vendor.t(userInfo.value.name),
        z: common_vendor.t(common_vendor.unref(infoP).weight + "kg"),
        A: common_vendor.unref(selectData).prefsIndex == 0 && common_vendor.unref(infoP).weight > 0,
        B: common_vendor.t(firstPro.arr[firstPro.index]),
        C: common_vendor.unref(selectData).prefsIndex == 1,
        D: common_vendor.t(secondPro.arr[secondPro.index]),
        E: common_vendor.unref(selectData).prefsIndex == 1,
        F: common_vendor.o(($event) => enrollStu(null, null))
      } : {}, {
        G: typeP.value === 2
      }, typeP.value === 2 ? {
        H: common_vendor.o([($event) => stuVal.value = $event.detail.value, filterStu]),
        I: stuVal.value,
        J: common_vendor.f(stuList.value, (item, index, i0) => {
          return {
            a: item.avatarUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.weight + "kg"),
            d: (common_vendor.unref(selectData2).prefsIndex == 0 || common_vendor.unref(selectData2).prefsIndex == 2) && item.weight != null,
            e: common_vendor.t(firstPro.arr[item.firstIdx]),
            f: common_vendor.t(secondPro.arr[item.secondIdx]),
            g: common_vendor.n(item.state ? "active" : ""),
            h: index,
            i: common_vendor.o(($event) => enrollStu(item, index), index)
          };
        }),
        K: common_vendor.unref(selectData2).prefsIndex == 1 || common_vendor.unref(selectData2).prefsIndex == 3,
        L: common_vendor.unref(selectData2).prefsIndex == 1 || common_vendor.unref(selectData2).prefsIndex == 3,
        M: common_vendor.o(addStu)
      } : {}, {
        N: common_vendor.o(($event) => signUp(false))
      }) : {}, {
        O: 3 === common_vendor.unref(selindex)
      }, 3 === common_vendor.unref(selindex) ? common_vendor.e({
        P: enrollList.value.length === 0
      }, enrollList.value.length === 0 ? {} : {
        Q: common_vendor.f(enrollList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.avatarUrl
          }, typeP.value === 1 && common_vendor.unref(selectData).prefsIndex == 0 || typeP.value === 2 && (common_vendor.unref(selectData2).prefsIndex == 0 || common_vendor.unref(selectData2).prefsIndex == 2) ? {
            c: common_vendor.t(item.weight)
          } : {}, typeP.value === 1 && common_vendor.unref(selectData).prefsIndex == 1 || typeP.value === 2 && (common_vendor.unref(selectData2).prefsIndex == 1 || common_vendor.unref(selectData2).prefsIndex == 3) ? {
            d: common_vendor.t(item.first)
          } : {}, common_vendor.unref(selectData).prefsIndex == 1 || common_vendor.unref(selectData2).prefsIndex == 1 || common_vendor.unref(selectData2).prefsIndex == 3 ? {
            e: common_vendor.t(item.second)
          } : {}, {
            f: common_vendor.t(item.state),
            g: common_vendor.o(($event) => cancel(item, index), index),
            h: index
          });
        }),
        R: typeP.value === 1 && common_vendor.unref(selectData).prefsIndex == 0 || typeP.value === 2 && (common_vendor.unref(selectData2).prefsIndex == 0 || common_vendor.unref(selectData2).prefsIndex == 2),
        S: typeP.value === 1 && common_vendor.unref(selectData).prefsIndex == 1 || typeP.value === 2 && (common_vendor.unref(selectData2).prefsIndex == 1 || common_vendor.unref(selectData2).prefsIndex == 3),
        T: common_vendor.unref(selectData).prefsIndex == 1 || common_vendor.unref(selectData2).prefsIndex == 1 || common_vendor.unref(selectData2).prefsIndex == 3
      }, {
        U: common_vendor.o(pay)
      }) : {}, {
        V: common_vendor.o(pswConfirm),
        W: common_vendor.p({
          mode: "input",
          type: "number",
          title: "填写体重（" + stuName.value + "）",
          placeholder: "请输入(kg) (保留一位小数)"
        }),
        X: common_vendor.sr(popup, "628f6b9f-0", {
          "k": "popup"
        }),
        Y: common_vendor.t(firstPro.arr[firstPro.index]),
        Z: firstPro.arr,
        aa: firstPro.index,
        ab: common_vendor.o(propickerChangeGR),
        ac: common_vendor.t(secondPro.arr[secondPro.index]),
        ad: secondPro.arr,
        ae: secondPro.index,
        af: common_vendor.o(proPickerChange2),
        ag: common_vendor.sr(popup2, "628f6b9f-2", {
          "k": "popup2"
        }),
        ah: common_vendor.sr("inputClose", "628f6b9f-4,628f6b9f-3"),
        ai: common_vendor.o(dialogInputConfirm),
        aj: common_vendor.p({
          mode: "input",
          title: "报名密码",
          placeholder: "请输入报名密码(6位数) "
        }),
        ak: common_vendor.sr(inputDialog, "628f6b9f-3", {
          "k": "inputDialog"
        }),
        al: common_vendor.p({
          type: "dialog"
        }),
        am: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        an: common_vendor.sr(message, "628f6b9f-5", {
          "k": "message"
        }),
        ao: common_vendor.p({
          type: "message"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/vue3/taiquandao/pages/core/enroll/index.vue"]]);
wx.createPage(MiniProgramPage);
