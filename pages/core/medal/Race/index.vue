<template>
  <!-- 没出结果 -->
  <view class="race_item race_item_blue" v-if="msg.winner === 0">
    <image
      lazy-load
      class="race_bg"
      src="http://39.100.78.225:8002/noWinner.png"
      mode=""
    ></image>
    <!-- <a class="detail" href="#">详情&gt;</a> -->
    <view class="title" style="top: 6rpx">个人竞技{{ msg.index + 1 }}</view>
    <view class="race_player">
      <view class="player player_l">
        <image
          lazy-load
          class="headImg"
          style="z-index: 2"
          :src="msg.pic1"
          mode=""
        ></image>
        <view class="race_text">
          <view class="userName">{{ msg.name1 }}</view>
          <text class="user_msg">{{ msg.sex1 === 1 ? "男" : "女" }}</text
          ><br />
          <text class="user_msg">{{ msg.year1 }}</text
          ><br />
          <text class="user_msg">{{ msg.weight1 }}</text>
        </view>
        <text class="martial">{{ msg.org1 }}</text>
      </view>
      <view class="player player_r">
        <image
          lazy-load
          class="headImg"
          style="z-index: 2"
          :src="msg.pic2"
          mode=""
        ></image>
        <view class="race_text">
          <view class="userName">{{ msg.name2 }}</view>
          <text class="user_msg">{{ msg.sex2 === 2 ? "男" : "女" }}</text
          ><br />
          <text class="user_msg">{{ msg.year2 }}</text
          ><br />
          <text class="user_msg">{{ msg.weight2 }}</text>
        </view>
        <text class="martial">{{ msg.org2 }}</text>
      </view>
    </view>
  </view>

  <view class="race_item race_item_blue" v-if="msg.winner === 1">
    <image
      lazy-load
      class="race_bg"
      src="http://39.100.78.225:8002/blue_win.png"
      mode=""
    ></image>
    <a class="detail" href="#">详情&gt;</a>
    <view class="title">个人竞技{{ msg.index + 1 }}</view>
    <view class="race_player">
      <view class="player player_l">
        <image lazy-load class="headImg" :src="msg.pic1" mode=""></image>
        <view class="race_text">
          <view class="userName">{{ msg.name1 }}</view>
          <text class="user_msg">{{ msg.sex1 === 1 ? "男" : "女" }}</text
          ><br />
          <text class="user_msg">{{ msg.year1 }}</text
          ><br />
          <text class="user_msg">{{ msg.weight1 }}</text>
        </view>
        <text class="martial">{{ msg.org1 }}</text>
      </view>
      <view class="player player_r">
        <image lazy-load class="headImg" :src="msg.pic2" mode=""></image>
        <view class="race_text">
          <view class="userName">{{ msg.name2 }}</view>
          <text class="user_msg">{{ msg.sex2 === 1 ? "男" : "女" }}</text
          ><br />
          <text class="user_msg">{{ msg.year2 }}</text
          ><br />
          <text class="user_msg">{{ msg.weight2 }}</text>
        </view>
        <text class="martial">{{ msg.org2 }}</text>
      </view>
    </view>
  </view>

  <view class="race_item race_item_blue" v-if="msg.winner === 2">
    <image
      lazy-load
      class="race_bg"
      src="http://39.100.78.225:8002/red_win.png"
      mode=""
    ></image>
    <a class="detail" href="#">详情&gt;</a>
    <view class="title">个人竞技{{ msg.index + 1 }}</view>
    <view class="race_player">
      <view class="player player_l">
        <image lazy-load class="headImg" :src="msg.pic1" mode=""></image>
        <view class="race_text">
          <view class="userName">{{ msg.name2 }}</view>
          <text class="user_msg">{{ msg.sex2 === 1 ? "男" : "女" }}</text
          ><br />
          <text class="user_msg">{{ msg.year2 }}</text
          ><br />
          <text class="user_msg">{{ msg.weight2 }}</text>
        </view>
        <text class="martial">{{ msg.org2 }}</text>
      </view>
      <view class="player player_r">
        <image lazy-load class="headImg" :src="msg.pic2" mode=""></image>
        <view class="race_text">
          <view class="userName">{{ msg.name1 }}</view>
          <text class="user_msg">{{ msg.sex1 === 1 ? "男" : "女" }}</text
          ><br />
          <text class="user_msg">{{ msg.year1 }}</text
          ><br />
          <text class="user_msg">{{ msg.weight1 }}</text>
        </view>
        <text class="martial">{{ msg.org1 }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>

<style scoped>
.userName {
  font-size: 40upx;
  height: 65rpx;
}

.race_item {
  position: relative;
  width: 750upx;
  height: 200upx;
  margin-top: 40upx;
}

.race_bg {
  position: absolute;
  width: 750upx;
  height: 200upx;
  z-index: 1;
}

.race_player {
  position: absolute;
  display: flex;
}

.player {
  position: relative;
  width: 375upx;
  height: 245upx;
}

.player_l .race_text {
  position: absolute;
  text-align: left;
  top: 10upx;
  right: 20upx;
  width: 220upx;
  height: 135upx;
  transform: scale(0.7);
  color: #fff;
  text-shadow: 2upx 10upx 8upx #2a2a2a;
}

.player_r .race_text {
  position: absolute;
  text-align: right;
  top: 10upx;
  right: 130upx;
  width: 220upx;
  height: 135upx;
  transform: scale(0.7);
  color: #fff;
  text-shadow: 2upx 10upx 8upx #2a2a2a;
}

.race_text,
.martial {
  z-index: 2;
}

.player_l .martial {
  position: absolute;
  bottom: 70upx;
  font-size: 28upx;
  transform: scale(0.76);
  color: #fff;
  text-shadow: 2upx 10upx 8upx #2a2a2a;
}

.player_r .martial {
  position: absolute;
  right: 0px;
  bottom: 70upx;
  font-size: 28upx;
  transform: scale(0.76);
  color: #fff;
  text-shadow: 2upx 10upx 8upx #2a2a2a;
}

.user_msg {
  font-size: 28rpx;
}

.player_l .headImg {
  position: absolute;
  left: 35upx;
  top: 44upx;
  width: 90upx;
  height: 90upx;
  border-radius: 50%;
}

.player_r .headImg {
  position: absolute;
  top: 40upx;
  right: 31upx;
  width: 92upx;
  height: 96upx;
  border-radius: 50%;
}

.player_l .res {
  position: absolute;
  top: 98upx;
  left: 95upx;
  width: 43upx;
  height: 43upx;
  border-radius: 50%;
  box-shadow: 0upx 10upx 10upx rgba(24, 24, 24, 0.5);
}

.player_r .res {
  position: absolute;
  top: 98upx;
  right: 95upx;
  width: 43upx;
  height: 43upx;
  border-radius: 50%;
  box-shadow: 0upx 10upx 10upx rgba(24, 24, 24, 0.5);
}

.detail {
  position: absolute;
  left: 345upx;
  bottom: 20upx;
  text-decoration: none;
  color: #fff;
  font-size: 22upx;
  transform: scale(0.7);
  z-index: 1;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  line-height: 45upx;
  font-size: 26upx;
  color: #fff;
  z-index: 2;
}
</style>
