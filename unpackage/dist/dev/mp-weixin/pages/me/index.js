"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let user = common_vendor.ref({
      avatarUrl: common_assets.grey,
      nickName: "未登录",
      organization: "登录查看组织",
      win: 0,
      lose: 0,
      points: 0
    });
    user.value.rate = common_vendor.computed(() => {
      if (user.value.win + user.value.lose === 0)
        return 0;
      return (user.value.win / (user.value.win + user.value.lose) * 100).toFixed(2);
    });
    const isLogin = common_vendor.ref(common_vendor.index.getStorageSync("isLogin"));
    function showUserInfo() {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      isLogin.value = true;
      user.value.nickName = userInfo.name;
      user.value.organization = userInfo.org;
      user.value.win = userInfo.win;
      user.value.lose = userInfo.lose;
      user.value.points = user.value.win * 10 + user.value.lose * 5;
      user.value.avatarUrl = userInfo.photo;
    }
    function toPage(route) {
      common_vendor.index.navigateTo({
        url: `/pages/core/` + route + `/index`
      });
    }
    function toPersonalData() {
      common_vendor.index.navigateTo({
        url: "/pages/core/register/index"
      });
    }
    function toScore() {
      common_vendor.index.navigateTo({
        url: "/pages/core/race/index"
      });
    }
    function toMarCert() {
      common_vendor.index.navigateTo({
        url: "/pages/core/marCert/index"
      });
    }
    function toJudge() {
      common_vendor.index.navigateTo({
        url: "/pages/core/judge/login"
      });
    }
    function getInfo() {
      common_vendor.index.request({
        url: "https://cqshq.top/Login?id=" + common_vendor.index.getStorageSync("openid"),
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log("Login-res", res);
          if (res.statusCode === 404) {
            common_vendor.index.clearStorageSync();
            common_vendor.index.setStorageSync("isLogin", false);
            common_vendor.index.setStorageSync("openid", openid.value);
            console.log("获取openid第二次", common_vendor.index.getStorageSync("openid"));
            toPersonalData();
            console.log("isLogin.value", isLogin.value);
          } else {
            common_vendor.index.setStorageSync("userInfo", res.data);
            common_vendor.index.setStorageSync("type", res.data.type);
            common_vendor.index.setStorageSync("isLogin", true);
            showUserInfo();
          }
        }
      });
    }
    const openid = common_vendor.ref();
    function getUserInfo() {
      common_vendor.index.getUserProfile({
        lang: "zh_CN",
        desc: "用户登录",
        // 声明获取用户个人信息后的用途，后续会展示在弹窗中，
        success: (res) => {
          console.log("getUserProfile-res", res);
          common_vendor.index.login({
            provider: "weixin",
            success: async function(res2) {
              console.log("---res----", res2);
              const openidFn = common_vendor.Es.importObject("openid");
              openid.value = await openidFn.getOpenid(res2.code);
              try {
                common_vendor.index.setStorageSync("openid", openid.value);
                console.log("获取openid", common_vendor.index.getStorageSync("openid"));
              } catch (e) {
                console.log("缓存openid失败!");
              }
              getInfo();
            }
          });
        },
        fail: (err) => {
        }
      });
    }
    common_vendor.onMounted(() => {
      console.log("isLogin", isLogin.value);
      console.log("userInfo", common_vendor.index.getStorageSync("userInfo"));
      if (common_vendor.index.getStorageSync("userInfo"))
        showUserInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(getUserInfo),
        b: common_vendor.unref(user).avatarUrl,
        c: common_vendor.t(common_vendor.unref(user).nickName),
        d: common_vendor.t(common_vendor.unref(user).organization),
        e: isLogin.value === true
      }, isLogin.value === true ? {
        f: common_vendor.t(common_vendor.unref(user).win),
        g: common_vendor.t(common_vendor.unref(user).lose),
        h: common_vendor.t(common_vendor.unref(user).points),
        i: common_vendor.t(common_vendor.unref(user).rate)
      } : {}, {
        j: !isLogin.value
      }, !isLogin.value ? {
        k: common_vendor.o(getUserInfo)
      } : {}, {
        l: isLogin.value
      }, isLogin.value ? {
        m: common_vendor.o(($event) => toPage("msg")),
        n: common_vendor.o(toScore),
        o: common_vendor.o((...args) => _ctx.pai_page && _ctx.pai_page(...args)),
        p: common_vendor.o(toJudge),
        q: common_vendor.o(toMarCert),
        r: common_vendor.o((...args) => _ctx.lianxi_btn && _ctx.lianxi_btn(...args))
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c8e26b33"], ["__file", "D:/code/vue3/taiquandao/pages/me/index.vue"]]);
wx.createPage(MiniProgramPage);
