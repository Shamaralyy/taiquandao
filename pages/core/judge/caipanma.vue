<template>
  <view>
    <!-- 顶部背景 -->
    <image
      class="background"
      src="http://39.100.78.225:8002/background.png"
    ></image>
    <view class="center-box">
      <view class="nav">
        <view class="select">
          <text>请输入裁判码</text>
        </view>
        <!-- <input class="input"><input> -->
      </view>
      <input class="input" v-model="refereeCode" />
      <view class="sumbit-btn">
        <button
          @tap="toCaipan"
          style="background-color: #26221f; font-size: 30rpx"
          type="primary"
        >
          <navigator>确认</navigator>
        </button>
      </view>
    </view>

    <!-- 重影 -->
    <view class="shadow shadow-1"></view>
    <view class="shadow shadow-2"></view>
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message
        :type="msgType"
        :message="messageText"
        :duration="2000"
      ></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { judgeCodeTestAPI } from "@/API/judge.js";

let refereeCode = ref(null);
let account = ref(null);
let password = ref(null);
//弹出层
let message = ref();
let msgType = ref("success");
let messageText = ref("这是一条成功提示");
onLoad((options) => {
  account.value = options.account;
  password.value = options.password;
});
async function toCaipan() {
  if (refereeCode.value === null) {
    messageToggle("warn", "请输入裁判码");
  } else {
    try {
      let res = await judgeCodeTestAPI(
        account.value,
        password.value,
        refereeCode.value
      );
      console.log("udgeCodeTestAPI-res", res);
    } catch (e) {}
    uni.navigateTo({
      url: "/pages/judge/caipan",
    });
  }
}
function messageToggle(type, content) {
  msgType.value = type;
  messageText.value = `${content}`;
  message.value.open();
}
</script>

<style>
page {
  height: 100%;
  background-color: #26221f;
  margin: 0px;
  padding: 0px;
}

.background {
  width: 100%;
}

.center-box {
  background-color: white;
  margin: -10% 30rpx 0rpx 30rpx;
  padding: 25rpx;
  border-radius: 15rpx;
  -webkit-filter: drop-shadow(0 0 8rpx #26221f);
  filter: drop-shadow(0 0 8rpx #26221f);
}

.nav {
  display: flex;
  text-align: center;
  font-size: 32rpx;
  margin-bottom: 8%;
}

.select {
  margin: auto;
  font-weight: bold;
  color: #26221f;
}

.select text {
  padding-bottom: 5rpx;
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
  border-bottom: 5rpx solid #26221f;
}

/* 重影 */
.shadow {
  box-shadow: 0rpx 0rpx 10rpx 0rpx #26221f;
  border-radius: 25rpx;
  background-color: white;
}

.shadow-1 {
  height: 40rpx;
  margin: -20rpx 50rpx 0 50rpx;
}

.shadow-2 {
  position: relative;
  z-index: -888;
  height: 50rpx;
  margin: -30rpx 80rpx 0 80rpx;
}

.input {
  width: 30%;
  height: 30px;
  border: #26221f solid 2px;
  margin: -2% auto;
  text-align: center;
}

.sumbit-btn {
  margin: 8% 0rpx 10rpx 0rpx;
}
</style>
