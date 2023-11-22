"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_utils = require("../../../utils/utils.js");
if (!Array) {
  const _easycom_song_data_picker2 = common_vendor.resolveComponent("song-data-picker");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_song_data_picker2 + _easycom_uni_file_picker2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_song_data_picker = () => "../../../uni_modules/song-data-picker/components/song-data-picker/song-data-picker.js";
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (avatar + _easycom_song_data_picker + _easycom_uni_file_picker + _easycom_uni_popup_message + _easycom_uni_popup)();
}
const avatar = () => "../../../components/yq-avatar/yq-avatar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const openid = common_vendor.ref(common_vendor.index.getStorageSync("openid"));
    let isShow = common_vendor.ref(false);
    let hjzm = common_vendor.ref([]);
    let baseHjzm = common_vendor.ref([]);
    common_vendor.ref(false);
    common_vendor.ref([]);
    let hjzmArr = common_vendor.ref([
      {
        gold_filename: null,
        base64code2: null
      }
    ]);
    let avatarSrc = common_vendor.ref(
      "https://img-qn.51miz.com/Element/00/41/38/39/407da9aa_E413839_a95d89b1.png"
    );
    let baseAvatar = common_vendor.ref("");
    let avatarName = common_vendor.ref("");
    let marList = common_vendor.ref([]);
    let userMsg = common_vendor.ref({
      name: "",
      marName: "",
      mar_n: 1,
      IDcard: "",
      sex: "未知",
      sexNum: 1,
      isDeclared: "",
      date: "请选择出生日期"
    });
    let isChecked = common_vendor.ref(true);
    let message = common_vendor.ref();
    let msgType = common_vendor.ref("success");
    let messageText = common_vendor.ref("这是一条成功提示");
    let files = common_vendor.ref();
    let index = common_vendor.ref();
    function getIndex(e) {
      index.value = e;
      hjzm.value.splice(index.value, 1);
      baseHjzm.value.splice(index.value, 1);
    }
    function handleInput(e) {
      userMsg.value.name = validateNumber(e.detail.value);
    }
    function validateNumber(val) {
      return val.replace(/[^\u4e00-\u9fa5]/g, "");
    }
    function myUpload(rsp) {
      avatarSrc.value = rsp.path;
      avatarName.value = avatarSrc.value.slice(12, 22);
      common_vendor.wx$1.compressImage({
        src: avatarSrc.value,
        // 图片路径
        success: (res) => {
          common_vendor.pathToBase64(res.tempFilePath).then((base64) => {
            baseAvatar.value = base64;
          });
        },
        fail: (err) => {
          console.log("compress-err", err);
        }
      });
    }
    function select(e) {
      e.tempFiles.forEach((i) => {
        hjzm.value.push(i.name);
      });
      e.tempFilePaths.forEach((i) => {
        common_vendor.wx$1.compressImage({
          src: i,
          // 图片路径
          success: (res) => {
            common_vendor.pathToBase64(res.tempFilePath).then((base64) => {
              baseHjzm.value.push(base64.slice(22));
            });
          },
          fail: (err) => {
            console.log("compress-err", err);
          }
        });
      });
    }
    function onchange(e) {
      e.detail.value;
    }
    const org_id = common_vendor.ref();
    function onnodeclick(node) {
      userMsg.value.marName = node.text;
      org_id.value = node.value;
    }
    function changeCheck() {
      isChecked.value = !isChecked.value;
    }
    function radioChange(e) {
      userMsg.value.isDeclared = e.detail.value;
      if (userMsg.value.isDeclared === "1") {
        isShow.value = true;
      } else {
        isShow.value = false;
      }
    }
    function messageToggle(type, content) {
      msgType.value = type;
      messageText.value = `${content}`;
      message.value.open();
    }
    function identifyIDcard() {
      if (utils_utils.testReg("IDcard", userMsg.value.IDcard)) {
        message.value.close();
        userMsg.value.sex = IdCard(userMsg.value.IDcard, 2);
        userMsg.value.date = IdCard(userMsg.value.IDcard, 1);
      } else {
        messageToggle("error", "请输入正确的身份证号！");
      }
    }
    const addStu = common_vendor.ref(false);
    function getInfo() {
      if (addStu.value) {
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/core/enroll/index?selindex=" + 2
          });
        }, 50);
      } else {
        common_vendor.index.request({
          url: "https://cqshq.top/Login?id=" + openid.value,
          header: {
            "Content-Type": "application/json"
          },
          success: (res) => {
            console.log("Login-res", res);
            common_vendor.index.setStorageSync("userInfo", res.data);
            common_vendor.index.setStorageSync("type", res.data.type);
            common_vendor.index.setStorageSync("isLogin", true);
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/me/index"
              });
            }, 50);
          }
        });
      }
    }
    function postPersonalData() {
      if (userMsg.value.sex === "男") {
        userMsg.value.sexNum = 1;
      } else {
        userMsg.value.sexNum = 0;
      }
      if (baseAvatar.value === "" || userMsg.value.name === "" || userMsg.value.marName === "" || userMsg.value.IDcard === "" || userMsg.value.sex === "未知" || userMsg.value.date === "请选择出生日期" || userMsg.value.isDeclared === "" || avatarName.value === "") {
        messageToggle("error", "请确保信息填写完整!");
      } else {
        if (isChecked.value === false) {
          messageToggle("warn", "请勾选《用户隐私协议》同意书");
          return;
        }
        if (utils_utils.testReg("name", userMsg.value.name) && utils_utils.testReg("IDcard", userMsg.value.IDcard)) {
          if (userMsg.value.isDeclared === "true" && baseHjzm.value.length === 0) {
            messageToggle("warn", "需提供获奖证明");
          } else {
            hjzmArr.value = [
              {
                gold_filename: null,
                base64code2: null
              }
            ];
            if (userMsg.value.isDeclared) {
              hjzmArr.value = [];
              for (let i = 0; i < hjzm.value.length; i++) {
                hjzmArr.value.push({
                  gold_filename: null,
                  base64code2: null
                });
                hjzmArr.value[i].gold_filename = hjzm.value[i];
                hjzmArr.value[i].base64code2 = baseHjzm.value[i];
              }
            }
            if (addStu.value) {
              common_vendor.index.request({
                url: "https://cqshq.top/AddPlayer?org_id=" + org_id.value,
                method: "POST",
                header: {
                  "Content-Type": "application/json"
                },
                data: {
                  age: Number(utils_utils.getAge(userMsg.value.date)),
                  sex: Number(userMsg.value.sexNum),
                  id: openid.value,
                  name: String(userMsg.value.name),
                  birthdate: String(userMsg.value.date),
                  organization: String(userMsg.value.marName),
                  idCardNumber: String(userMsg.value.IDcard),
                  joinInGold: Number(userMsg.value.isDeclared),
                  pic: avatarName.value.slice(0, avatarName.value.length - 4),
                  base64code1: String(baseAvatar.value.slice(22)),
                  gd: hjzmArr.value
                },
                success: (res) => {
                  console.log("reg-res", res);
                  if (res.statusCode === 400) {
                    messageToggle("warn", "您已注册！");
                  } else {
                    messageToggle("success", "提交成功");
                    getInfo();
                  }
                },
                fail: (err) => {
                  console.log("reg-err", err);
                }
              });
            } else {
              common_vendor.index.request({
                url: "https://cqshq.top/GetUsersInfo?org_id=" + org_id.value,
                method: "POST",
                header: {
                  "Content-Type": "application/json"
                },
                data: {
                  age: Number(utils_utils.getAge(userMsg.value.date)),
                  sex: Number(userMsg.value.sexNum),
                  id: openid.value,
                  name: String(userMsg.value.name),
                  birthdate: String(userMsg.value.date),
                  organization: String(userMsg.value.marName),
                  idCardNumber: String(userMsg.value.IDcard),
                  joinInGold: Number(userMsg.value.isDeclared),
                  pic: avatarName.value.slice(0, avatarName.value.length - 4),
                  base64code1: String(baseAvatar.value.slice(22)),
                  gd: hjzmArr.value
                },
                success: (res) => {
                  if (res.statusCode === 400) {
                    messageToggle("warn", "您已注册！");
                  } else {
                    messageToggle("success", "提交成功");
                    getInfo();
                  }
                },
                fail: (err) => {
                  console.log("reg-err", err);
                }
              });
            }
          }
        } else {
          messageToggle("error", "请输入正确的姓名和身份证号！");
        }
      }
    }
    function IdCard(IdCard2, type) {
      if (type === 1) {
        let birthday = IdCard2.substring(6, 10) + "-" + IdCard2.substring(10, 12) + "-" + IdCard2.substring(12, 14);
        return birthday;
      }
      if (type === 2) {
        if (parseInt(IdCard2.substr(16, 1)) % 2 === 1) {
          return "男";
        } else {
          return "女";
        }
      }
    }
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: "https://cqshq.top/SendOrgsInfo",
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log("SendOrgsInfo-res", res);
          let marlist = [];
          JSON.parse(res.data).forEach((item) => {
            marlist.push({
              text: item.name,
              value: item.id
            });
          });
          marList.value = marlist;
        }
      });
    });
    common_vendor.onLoad((options) => {
      addStu.value = options.addStu;
      if (addStu.value)
        openid.value = "000000";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(myUpload),
        b: common_vendor.p({
          selWidth: "200px",
          selHeight: "400upx",
          avatarSrc: common_vendor.unref(avatarSrc),
          avatarStyle: "width: 120rpx; height: 120rpx;border:1px solid rgba(150, 150, 150, 0.6);box-shadow: 0px 2rpx 8rpx 0rpx rgba(150, 150, 150, 0.6);"
        }),
        c: common_vendor.o([($event) => common_vendor.unref(userMsg).name = $event.detail.value, handleInput]),
        d: common_vendor.unref(userMsg).name,
        e: common_vendor.o(onchange),
        f: common_vendor.o(onnodeclick),
        g: common_vendor.p({
          localdata: common_vendor.unref(marList),
          ["popup-title"]: "请选择武馆名称",
          openSearch: true
        }),
        h: common_vendor.o([($event) => common_vendor.unref(userMsg).IDcard = $event.detail.value, identifyIDcard]),
        i: common_vendor.unref(userMsg).IDcard,
        j: common_vendor.t(common_vendor.unref(userMsg).sex),
        k: common_vendor.t(common_vendor.unref(userMsg).date),
        l: common_vendor.o(radioChange),
        m: common_vendor.sr(files, "e992fd98-2", {
          "k": "files"
        }),
        n: common_vendor.o(getIndex),
        o: common_vendor.o(select),
        p: common_vendor.p({
          fileMediatype: "image",
          mode: "grid",
          limit: 1,
          ["auto-upload"]: false
        }),
        q: common_vendor.unref(isShow),
        r: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        s: common_vendor.sr(message, "e992fd98-3", {
          "k": "message"
        }),
        t: common_vendor.p({
          type: "message"
        }),
        v: common_vendor.o(changeCheck),
        w: common_vendor.unref(isChecked),
        x: common_vendor.o(postPersonalData)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e992fd98"], ["__file", "D:/code/vue3/taiquandao/pages/core/register/index.vue"]]);
wx.createPage(MiniProgramPage);
