<template>
  <view>
    <view class="race_tab_list">
      <view class="race_tab">
        <text @tap="n = 1" :style="{ color: n == 1 ? 'gray' : '' }"
          >冠军赛</text
        >
      </view>
      <view class="race_tab">
        <text @tap="n = 2" :style="{ color: n == 2 ? 'gray' : '' }"
          >新手赛</text
        >
      </view>
      <view class="race_tab">
        <text @tap="n = 3" :style="{ color: n == 3 ? 'gray' : '' }"
          >对决赛</text
        >
      </view>
    </view>

    <scroll-view @scrolltolower="handleToLower" scroll-y="" v-show="n == 1">
      <view
        class="race_item"
        @tap="toDetail(item)"
        v-for="item in gjs"
        :key="item"
      >
        <image :src="item.logo" />
        <view class="race_item_text">
          <text class="race_title">{{ item.name }}</text
          ><br />
          <div class="race_text_area">
            <text class="race_item_key">比赛类型：</text>
            <text class="race_item_value"> {{ item.type }} </text><br />
            <text class="race_item_key">时间：</text>
            <text class="race_item_value"> {{ item.startTime }} </text><br />
            <div style="height: 30upx"></div>
            <text class="race_item_key">地址：</text>
            <text class="race_item_value"> {{ item.address }} </text><br />
            <text class="race_item_key">联系方式：</text>
            <text class="race_item_value"> {{ item.ContactsTel }} </text><br />
            <text
              style="color: green; font-size: 25rpx"
              v-if="item.remainingDays > 0"
              >(正在报名)</text
            >
            <text style="color: red; font-size: 25rpx" v-else>(结束报名)</text>
          </div>
        </view>
      </view>
    </scroll-view>

    <scroll-view @scrolltolower="handleToLower" scroll-y="" v-show="n == 2">
      <view
        class="race_item"
        @tap="toDetail(item)"
        v-for="item in xss"
        :key="item.id"
      >
        <image :src="item.logo" />
        <view class="race_item_text">
          <text class="race_title">{{ item.name }}</text
          ><br />
          <div class="race_text_area">
            <text class="race_item_key">比赛类型：</text>
            <text class="race_item_value">{{ item.type }}</text
            ><br />
            <text class="race_item_key">时间：</text>
            <text class="race_item_value">{{ item.startTime }}</text
            ><br />
            <div style="height: 30upx"></div>
            <text class="race_item_key">地址：</text>
            <text class="race_item_value">{{ item.address }}</text
            ><br />
            <text class="race_item_key">联系方式：</text>
            <text class="race_item_value">{{ item.ContactsTel }}</text
            ><br />
            <text
              style="color: green; font-size: 25rpx"
              v-if="item.remainingDays > 0"
              >(正在报名)</text
            >
            <text style="color: red; font-size: 25rpx" v-else>(结束报名)</text>
          </div>
        </view>
      </view>
    </scroll-view>

    <scroll-view @scrolltolower="handleToLower" scroll-y="" v-show="n == 3">
      <view
        class="race_item"
        @tap="toDetail(item)"
        v-for="item in djs"
        :key="item.id"
      >
        <image :src="item.logo" />
        <view class="race_item_text">
          <text class="race_title">{{ item.name }}</text
          ><br />
          <div class="race_text_area">
            <text class="race_item_key">比赛类型：</text>
            <text class="race_item_value">{{ item.type }}</text
            ><br />
            <text class="race_item_key">时间：</text>
            <text class="race_item_value">{{ item.startTime }}</text
            ><br />
            <div style="height: 30upx"></div>
            <text class="race_item_key">地址：</text>
            <text class="race_item_value">{{ item.address }}</text
            ><br />
            <text class="race_item_key">联系方式：</text>
            <text class="race_item_value">{{ item.ContactsTel }}</text
            ><br />
            <text
              style="color: green; font-size: 25rpx"
              v-if="item.remainingDays > 0"
              >(正在报名)</text
            >
            <text style="color: red; font-size: 25rpx" v-else>(结束报名)</text>
          </div>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from "vue";
let tags = ["跆拳道", "排名赛", "选拔赛", "比赛等级", "各种标签"];
let n = ref(1);
let gjs = ref([]); // 冠军赛
let xss = ref([]); //新手赛
let djs = ref([]); //对决赛
//触底事件
function toLowerReq(racelist, type) {
  let id = racelist.value[racelist.value.length - 1].id;
  uni.request({
    url: "https://cqshq.top/SendGamesInfo?id=" + id + "&type=" + type,
    header: {
      "Content-Type": "application/json",
    },
    success: (res) => {
      racelist.value.push(res.data);
    },
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
  uni.navigateTo({
    url: "/pages/core/detail/index?id=" + item.id,
  });
}

function getList(type, id, val) {
  uni.request({
    url: `https://cqshq.top/SendGamesInfo?type=${type}&id=${id}`,
    header: {
      "Content-Type": "application/json",
    },
    success: (res) => {
      console.log(`race${id}-res`, JSON.parse(res.data));
      val = JSON.parse(res.data);
    },
  });
}

const showList = () => {
  getList(1, 0, xss.value);
  getList(2, 0, djs.value);
  getList(3, 0, gjs.value);
};
showList();
</script>

<style scoped>
.race_tab_list {
  display: flex;
  font-size: 27upx;
  margin-bottom: 20upx;
}

.race_tab {
  margin-top: 20upx;
  width: 250upx;
  text-align: center;
}

.race_item {
  display: flex;
  width: 750upx;
  height: 250upx;
  margin-top: 45upx;
}

.race_title {
  font-size: 35upx;
  font-weight: 550;
}

.race_item image {
  margin-left: 16upx;
  width: 210upx;
  height: 210upx;
  border-radius: 20upx;
}

.race_item_key {
  font-size: 24upx;
  color: rgb(96, 96, 96);
}

.race_text_area {
  transform: scale(0.78);
  margin-top: -6upx;
  margin-left: -60upx;
}

.race_item_text {
  width: 550upx;
  height: 250upx;
  margin-left: 0upx;
  margin-top: -10upx;
  transform: scale(0.88);
}

.race_item_value {
  font-size: 27upx;
}
</style>
