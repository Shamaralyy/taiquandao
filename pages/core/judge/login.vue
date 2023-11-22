<template>
  <view class="judge_login">
    <!-- 顶部背景 -->
    <image
      class="background"
      src="http://39.100.78.225:8002/background.png"
    ></image>

    <!-- 登录、注册 -->
    <view class="center-box">
      <view class="nav">
        <view
          :class="['left', data.current == 1 ? 'select' : '']"
          @tap="click"
          data-code="1"
        >
          <text>登录</text>
        </view>
      </view>
      <!-- 登录 -->
      <view class="input-box" v-if="data.current == 1">
        <view class="wei-input">
          <icon type="waiting" color="#44ADFB" size="16"></icon>
          <input
            class="input"
            auto-focus
            placeholder="请输入手机号/登录名"
            v-model="log.account"
          />
        </view>
        <view class="wei-input">
          <icon type="success" color="#44ADFB" size="16"></icon>
          <input
            class="input"
            auto-focus
            placeholder="请输入登录密码"
            v-model="log.password"
          />
        </view>
        <view class="forget">
          <text>忘记密码?</text>
        </view>
      </view>
      <!-- 登录/注册 -->
      <view class="sumbit-btn">
        <button
          class="button"
          style="background-color: #26221f; font-size: 30rpx"
          bindtap="functiona"
          v-if="data.current == 1"
          type="primary"
          @tap="login"
        >
          <navigator>立即登录</navigator>
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
import { ref, reactive } from "vue";
let data = ref({
  current: 1,
  counting: false,
});
//弹出层
let message = ref();
let msgType = ref("success");
let messageText = ref("这是一条成功提示");

//注册信息
let reg = ref({
  name: "",
  phone: null,
  IDcard: null,
  password: null,
  confirm: null,
});
//登录信息
let log = ref({
  account: "",
  password: null,
});
// 登陆注册监听
function click(e) {
  let index = e.currentTarget.dataset.code;
  data.value.current = index;
}

function login() {
  if (log.value.account === "" || log.value.password === null) {
    messageToggle("warn", "请输入完整的信息");
  } else {
    messageToggle("success", "登录成功");
    setTimeout(() => {
      uni.navigateTo({
        url:
          "/pages/judge/caipanma?account=" +
          log.value.account +
          "&password=" +
          log.value.password,
      });
    }, 250);
  }
}

function messageToggle(type, content) {
  msgType.value = type;
  messageText.value = `${content}`;
  message.value.open();
}
</script>

<style>
.judge_login {
  height: 100vh;
  background-color: #26221f;
  margin: 0px;
  padding: 0px;
}

.next-text {
  margin-top: 15rpx;
}

/* 内容 */
.center-box {
  background-color: white;
  margin: -10% 30rpx 0rpx 30rpx;
  padding: 25rpx;
  border-radius: 15rpx;
  -webkit-filter: drop-shadow(0 0 8rpx #26221f);
  filter: drop-shadow(0 0 8rpx #26221f);
}

/* 导航 */
.nav {
  display: flex;
  text-align: center;
  font-size: 32rpx;
  margin-bottom: 8%;
}

.left {
  flex: 1;
  font-weight: bold;
}

.right {
  flex: 1;
  font-weight: bold;
}

.select {
  font-weight: bold;
  color: #26221f;
}

.select text {
  padding-bottom: 5rpx;
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
  border-bottom: 5rpx solid #26221f;
}

.wei-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f1f1f1;
}

.input-box {
  margin: 20rpx;
}

.input {
  padding-left: 20rpx;
  font-size: 30rpx;
}

.input-code {
  position: absolute;
  right: 40rpx;
  font-size: 26rpx;
  padding: 10rpx 15rpx;
  color: white;
  background-color: #ff8c69;
  border-radius: 10rpx;
}

.forget {
  font-size: 26rpx;
  color: #26221f;
  margin-top: 20rpx;
  text-align: right;
}

.sumbit-btn {
  margin: 6% 30rpx 30rpx 30rpx;
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

.background {
  width: 100%;
}
</style>
