<template>
  <view v-if="type === 1" class="msg-box">
    <image class="avatar" :src="userInfo.photo" mode=""></image>
    <view class="msg-text"
      ><text>姓名:</text><text>{{ userInfo.name }}</text></view
    >
    <view class="msg-text"><text>性别:</text><text>男</text></view>
    <view class="msg-text"
      ><text>道馆名称:</text><text>{{ userInfo.org }}</text></view
    >
    <view class="msg-text"
      ><text>身份证号:</text><text>500106200308040323</text></view
    >
    <view class="msg-text"><text>出生日期:</text><text>2003.08.04</text></view>
    <button class="btn" type="warn" @tap="changeMsg">更改个人信息</button>
  </view>
  <view v-if="type === 2">
    <view class="stu-container">
      <view class="stu">
        <image class="avatar ava" :src="userInfo.photo" mode=""></image
        ><text>学生</text>
      </view>
      <view class="stu">
        <image class="avatar ava" :src="userInfo.photo" mode=""></image
        ><text>学生</text>
      </view>
      <view class="stu">
        <image class="avatar ava" :src="userInfo.photo" mode=""></image
        ><text>学生</text>
      </view>
      <view class="stu">
        <image class="avatar ava" :src="userInfo.photo" mode=""></image
        ><text>学生</text>
      </view>
      <view class="stu">
        <image class="avatar ava" :src="userInfo.photo" mode=""></image
        ><text>学生</text>
      </view>
      <view class="stu">
        <image class="avatar ava" :src="userInfo.photo" mode=""></image
        ><text>学生</text>
      </view>
      <view class="stu">
        <image class="avatar ava" :src="userInfo.photo" mode=""></image
        ><text>学生</text>
      </view>
    </view>
    <button class="btn" type="warn" @tap="changeMsg">更改个人信息</button>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
/* const type = ref(2); */
const type = ref(uni.getStorageSync("type"));
const userInfo = ref("");
onMounted(() => {
  userInfo.value = uni.getStorageSync("userInfo");
});

const changeMsg = () => {};
</script>

<style scoped>
.msg-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50rpx;
}

.avatar {
  height: 148rpx;
  width: 148rpx;
  border-radius: 50%;
  margin: 20rpx auto 20rpx auto;
}

.msg-text {
  display: flex;
  justify-content: space-between;
  width: 500rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-bottom: 1px solid rgba(150, 150, 150, 0.6);
}

.btn {
  width: 330rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: rgb(236, 127, 105);
  color: #fff;
  margin-top: 100rpx;
  line-height: 80rpx;
}

.stu-container {
  display: flex;
  flex-wrap: wrap;
}

.stu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200rpx;
  height: 200rpx;
  background-color: antiquewhite;
  margin: 20rpx;
}

.ava {
  width: 100rpx;
  height: 100rpx;
}
</style>
