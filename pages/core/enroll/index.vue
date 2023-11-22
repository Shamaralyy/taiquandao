<template>
  <view>
    <view class="content">
      <!--pics文件夹下的background.jpg文件-->
      <image
        class="background"
        style="z-index: 1"
        src="http://39.100.78.225:8002/background.png"
      ></image>
      <!--页面其它部分-->
      <view class="up-text">{{ name }}</view>
      <view class="bottom">
        <view class="recongle"></view>
        <view class="text">{{ startTime }} ~ {{ endTime }}</view>
        <view class="recongle" style="margin-left: 375rpx"></view>
        <view class="text" style="margin-left: 400rpx">{{ addr }}</view>
      </view>
    </view>
    <!-- 导航栏部分 -->
    <view class="index-btns">
      <view
        class="btn"
        @tap="changeSel(index)"
        v-for="(item, index) in typeList"
        :key="index"
        :style="index === selindex ? 'background-color:#c5c5c5' : ''"
      >
        <view class="text" :style="index === selindex ? 'color:#050505' : ''">{{
          item.typename
        }}</view>
      </view>
    </view>
    <!-- 比赛规则页面 -->
    <view wx:key="index" v-if="0 === selindex">
      <view class="first">
        <view class="recongle"></view>
        <view class="title" style="color: red"
          >请详细阅读比赛规则和比赛公告</view
        >
        <view class="text" v-for="(item, index) in rules" :key="index">{{
          item
        }}</view>
      </view>
      <view class="first">
        <view class="recongle"></view>
        <view class="title">以下为公告内容</view>
        <view
          class="text"
          v-for="(item, index) in announcements"
          :key="index"
          style="margin-right: 30rpx"
        >
          {{ item }}
        </view>
      </view>
    </view>
    <!-- 比赛方式页面 -->
    <view wx:key="index" v-if="1 === selindex">
      <view class="thrid">
        <view
          style="
            position: relative;
            padding-top: 20rpx;
            padding-left: 40rpx;
            display: flex;
          "
        >
          <view class="recongle" style="background-color: black"></view>
          <view class="top">比赛方式</view>
        </view>
        <picker
          class="msg_picker"
          mode="selector"
          :range="selectData.prefsArr"
          v-if="typeP === 1"
          :value="selectData.prefsIndex"
          @change="pickerChangeGR"
        >
          <view>
            {{ selectData.prefsArr[selectData.prefsIndex] }}
          </view>
          <div class="h"></div>
        </picker>
        <picker
          class="msg_picker"
          mode="selector"
          :range="selectData2.prefsArr"
          v-if="typeP === 2"
          :value="selectData2.prefsIndex"
          @change="pickerChangeJL"
        >
          <view>
            {{ selectData2.prefsArr[selectData2.prefsIndex] }}
          </view>
          <div class="h"></div>
        </picker>
      </view>
      <button class="confirm-btn" @click="signUp(true)">确认</button>
    </view>
    <!-- 选择项目页面 -->
    <view wx:key="index" v-if="2 === selindex">
      <view
        v-if="typeP === 1"
        style="display: flex; justify-content: center; margin-top: 140rpx"
      >
        <!-- 个人 -->
        <view
          class="stu_box avatar"
          style="width: 350rpx; height: 400rpx"
          @click="enrollStu(null, null)"
        >
          <image
            :src="userInfo.photo"
            class="avatar"
            style="z-index: 1; width: 200rpx; height: 200rpx"
          ></image>
          <view class="name" style="font-size: 50rpx">{{ userInfo.name }}</view>
          <view
            class="name"
            v-show="selectData.prefsIndex == 0 && infoP.weight > 0"
            style="margin-top: 20rpx; font-size: 35rpx"
          >
            {{ infoP.weight + "kg" }}
          </view>
          <view
            class="name"
            v-show="selectData.prefsIndex == 1"
            style="margin-top: 10rpx"
          >
            首选:{{ firstPro.arr[firstPro.index] }}</view
          >
          <view class="name" v-show="selectData.prefsIndex == 1">
            备选:{{ secondPro.arr[secondPro.index] }}</view
          >
        </view>
      </view>
      <view v-if="typeP === 2">
        <!-- 教练 -->
        <input
          placeholder="请输入学生姓名..."
          v-model="stuVal"
          class="stu_ipt"
          @input="filterStu"
        />
        <view class="second">
          <scroll-view>
            <view
              :class="['stu_box', item.state ? 'active' : '']"
              v-for="(item, index) in stuList"
              :key="index"
              @click="enrollStu(item, index)"
            >
              <image
                style="z-index: 1"
                :src="item.avatarUrl"
                class="avatar"
              ></image>
              <view class="name">{{ item.name }}</view>
              <view
                class="name"
                v-show="
                  (selectData2.prefsIndex == 0 ||
                    selectData2.prefsIndex == 2) &&
                  item.weight != null
                "
              >
                {{ item.weight + "kg" }}
              </view>
              <view
                class="name"
                v-show="
                  selectData2.prefsIndex == 1 || selectData2.prefsIndex == 3
                "
              >
                首选:{{ firstPro.arr[item.firstIdx] }}</view
              >
              <view
                class="name"
                v-show="
                  selectData2.prefsIndex == 1 || selectData2.prefsIndex == 3
                "
              >
                备选:{{ secondPro.arr[item.secondIdx] }}</view
              >
            </view>
            <view class="stu_box" style="font-size: 90rpx" @click="addStu">
              +
            </view>
          </scroll-view>
        </view>
      </view>
      <button
        class="signUpBtn"
        @click="signUp(false)"
        style="margin-top: 60rpx"
      >
        报名
      </button>
    </view>
    <!-- 费用缴纳页面 -->
    <view wx:key="index" v-if="3 === selindex">
      <view class="fourth">
        <text v-if="enrollList.length === 0" class="noAdd">暂无数据</text>
        <view
          v-else
          class="box"
          v-for="(item, index) in enrollList"
          :key="index"
        >
          <view class="top">
            {{ item.name }}
          </view>
          <view style="display: flex">
            <view class="recongle"></view>
            <view
              style="
                position: relative;
                padding-top: 25rpx;
                padding-left: 50rpx;
              "
            >
              <image style="z-index: 1" :src="item.avatarUrl" class="a"></image>
            </view>
            <view
              class="text"
              v-if="
                (typeP === 1 && selectData.prefsIndex == 0) ||
                (typeP === 2 &&
                  (selectData2.prefsIndex == 0 || selectData2.prefsIndex == 2))
              "
            >
              体重：{{ item.weight }}kg</view
            >
            <view>
              <view
                class="text"
                v-if="
                  (typeP === 1 && selectData.prefsIndex == 1) ||
                  (typeP === 2 &&
                    (selectData2.prefsIndex == 1 ||
                      selectData2.prefsIndex == 3))
                "
              >
                首选：{{ item.first }}</view
              >
              <view
                class="text"
                v-if="
                  selectData.prefsIndex == 1 ||
                  selectData2.prefsIndex == 1 ||
                  selectData2.prefsIndex == 3
                "
                style="padding-top: 12rpx"
                >备选：{{ item.second }}</view
              >
            </view>
            <view class="text" style="margin-left: 50rpx">{{
              item.state
            }}</view>
            <view class="text" @tap="cancel(item, index)">取消报名</view>
          </view>
        </view>
      </view>
      <button class="mini-btn payBtn" type="primary" @tap="pay">
        点击缴费
      </button>
    </view>
  </view>

  <uni-popup ref="popup">
    <uni-popup-dialog
      mode="input"
      type="number"
      :title="'填写体重（' + stuName + '）'"
      placeholder="请输入(kg) (保留一位小数)"
      @confirm="pswConfirm"
    >
    </uni-popup-dialog>
  </uni-popup>

  <uni-popup ref="popup2">
    <view>
      <view style="color: white; margin-bottom: 30rpx"
        >首选项目
        <picker
          class="msg_picker"
          mode="selector"
          :range="firstPro.arr"
          style="background-color: white"
          :value="firstPro.index"
          @change="propickerChangeGR"
        >
          <view style="color: black">
            {{ firstPro.arr[firstPro.index] }}
          </view>
          <div class="h"></div>
        </picker>
      </view>
      <view style="color: white"
        >备选项目
        <picker
          class="msg_picker"
          mode="selector"
          :range="secondPro.arr"
          style="background-color: white"
          :value="secondPro.index"
          @change="proPickerChange2"
        >
          <view style="color: black">
            {{ secondPro.arr[secondPro.index] }}
          </view>
          <div class="h"></div>
        </picker>
      </view>
    </view>
  </uni-popup>
  <!-- 报名输入密码弹出框 -->
  <uni-popup ref="inputDialog" type="dialog">
    <uni-popup-dialog
      ref="inputClose"
      mode="input"
      title="报名密码"
      placeholder="请输入报名密码(6位数) "
      @confirm="dialogInputConfirm"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 提示信息弹窗 -->
  <uni-popup ref="message" type="message">
    <uni-popup-message
      :type="msgType"
      :message="messageText"
      :duration="2000"
    ></uni-popup-message>
  </uni-popup>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { selectGameAPI, wechatPayCallbackAPI } from "@/API/enroll.js";

let typeList = reactive([
  {
    id: 1,
    typename: "比赛规则",
    content: "1111111111111111",
  },
  {
    id: 2,
    typename: "比赛方式",
    content: "22222222222",
  },
  {
    id: 3,
    typename: "选择项目",
    content: "3",
  },
  {
    id: 4,
    typename: "费用缴纳",
    content: "4",
  },
]);
let selindex = ref(0);
let prefsName = ref("比赛名字比赛名字比赛名字");
let alternate1Name = ref("比赛名字比赛名字比赛名字");
let alternate2Name = ref("比赛名字比赛名字比赛名字");
//用户信息
let user = ref({
  nickName: "名字",
  organization: "登录查看组织",
  win: 0,
  lose: 0,
  points: 0,
});
//项目选择
const type = ref(uni.getStorageSync("type"));
let selectData = reactive({
  // 下拉框选项
  prefsIndex: 0,
  prefsArr: ["个人竞技", "个人品势"],
});
let selectData2 = reactive({
  // 下拉框选项
  prefsIndex: 0,
  prefsArr: ["个人竞技", "个人品势", "团队竞技", "团队品势"],
});
//首选项目和备选项目
const firstPro = reactive({
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
    "太极八章",
  ],
});
const secondPro = reactive({
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
    "太极八章",
  ],
});
const enrollList = ref([]);

//弹出层
let message = ref();
let msgType = ref("success");
let messageText = ref("这是一条成功提示");

function messageToggle(type, content) {
  msgType.value = type;
  messageText.value = `${content}`;
  message.value.open();
}

//搜索学生
const stuVal = ref("");
const sourceStuList = ref([]);
const stuList = ref(sourceStuList.value);

function filterStu() {
  stuList.value = sourceStuList.value.filter(
    (item) => item.name.indexOf(stuVal.value) != -1
  );
}
let selStu = ref([]);
let showmodel = false;
const popup = ref();
const popup2 = ref();
const stuName = ref(""); //当前选中的学生的name
const stuIdx = ref(0); //当前选中的学生的index
//添加学生
function addStu() {
  uni.navigateTo({
    url: "/pages/core/register/index?addStu=" + true,
  });
}
//选中学生
function enrollStu(item, index) {
  if (item === null && index === null) {
    //个人
    if (selectData.prefsIndex == 0) {
      stuName.value = sourceStuList.value[stuIdx.value].name;
      popup.value.open(); //填报体重
    } else {
      popup2.value.open(); //项目类别
    }
  } else {
    //教练
    /* 			type 1个人 2教练
						如果是个人：选择个人竞技 或者 个人品势
						如果是教练：选择个人竞技 或者 个人品势 或者团队竞技 团队品势 */
    stuIdx.value = index;
    if (selectData2.prefsIndex == 0 || selectData2.prefsIndex == 2) {
      if (item.state) item.state = false;
      else {
        selStu.value.push(item);
        stuName.value = sourceStuList.value[stuIdx.value].name;
        popup.value.open();
        weightIndex.value = index;
      }
    } else if (selectData2.prefsIndex == 1 || selectData2.prefsIndex == 3) {
      if (item.state) item.state = false;
      else {
        item.state = true;
        popup2.value.open();
      }
    }
  }
}
//输入体重
//------------个人
let infoP = ref({
  weight: 0,
});
//------------教练
let weightArr = ref([]);
let weightIndex = ref([]);
let isWeightTrue = ref(false);

function pswConfirm(val) {
  if (Number(val) > 0) {
    if (typeP.value === 1) {
      //个人
      infoP.value.weight = Number(val).toFixed(1);
    } else if (typeP.value === 2) {
      //教练
      isWeightTrue.value = true;
      sourceStuList.value[weightIndex.value].weight = Number(val).toFixed(1);
      sourceStuList.value[weightIndex.value].state =
        !sourceStuList.value[weightIndex.value].state;
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

function pickerChange2(e) {
  selectData.alternate1Index = e.detail.value;
}

function pickerChange3(e) {
  selectData.alternate2Index = e.detail.value;
}

function propickerChangeGR(e) {
  firstPro.index = e.detail.value;
  sourceStuList.value[stuIdx.value].firstIdx = e.detail.value;
}

function proPickerChange2(e) {
  secondPro.index = e.detail.value;
  sourceStuList.value[stuIdx.value].secondIdx = e.detail.value;
}

//报名
let obj = ref();
let goodsId = ref([]);
let typeC = ref(0); //竞技1  品势2
const objArr = ref([]); //报名接口需要post过去的请求体
function signUp(flag) {
  if (flag) {
    //在比赛方式页面点击确认
    selindex.value = 2; //跳转到选择学生页面
    enrollMsg.value = tmp_enrollMsg.value;
    goodsId.value = [
      Number(selectData.prefsIndex) + 1,
      Number(selectData.alternate1Index) + 1,
      Number(selectData.alternate2Index) + 1,
    ];
  } else {
    //点击报名
    const selectedStu = sourceStuList.value.filter(
      (item) => item.state === true
    );
    if (typeP.value === 1) {
      if (selectData.prefsIndex == 0) {
        //竞技
        if (infoP.value.weight > 0) {
          typeC.value = 1;
          objArr.value = [];
          objArr.value.push({
            id: uni.getStorageSync("openid"),
            name: uni.getStorageSync("userInfo").name,
            weight: Number(infoP.value.weight),
          });
          selindex.value = 3; //跳转到缴费页面
        } else {
          messageToggle("warn", "请输入正确的体重！");
        }
      } else if (selectData.prefsIndex == 1) {
        //品势
        typeC.value = 2;
        objArr.value = [];
        objArr.value.push({
          id: uni.getStorageSync("openid"),
          name: uni.getStorageSync("userInfo").name,
          first: Number(firstPro.index) + 1,
          second: Number(secondPro.index) + 1,
        });
      }
    } else if (typeP.value === 2) {
      typeC.value = 2;
      if (selectData2.prefsIndex == 0 || selectData2.prefsIndex == 2) {
        //竞技
        const selectedStu = sourceStuList.value.filter(
          (item) => item.state === true
        );
        objArr.value = [];
        selectedStu.map((item) => {
          objArr.value.push({
            id: item.id,
            name: item.name,
            weight: Number(item.weight),
          });
        });
      } else if (selectData2.prefsIndex == 1 || selectData2.prefsIndex == 3) {
        //品势
        typeC.value = 2;
        objArr.value = [];
        selectedStu.map((item) => {
          objArr.value.push({
            id: item.id,
            name: item.name,
            first: Number(item.firstIdx) + 1,
            second: Number(item.secondIdx) + 1,
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
            avatarUrl: uni.getStorageSync("userInfo").photo,
            weight: obj.value[0].weight,
            state: "未缴费",
          });
        } else if (selectData.prefsIndex == 1) {
          enrollList.value.push({
            name: obj.value[0].name,
            avatarUrl: uni.getStorageSync("userInfo").photo,
            first: firstPro.arr[firstPro.index],
            second: secondPro.arr[secondPro.index],
            state: "未缴费",
          });
        }
      } else if (typeP.value === 2) {
        if (selectData2.prefsIndex == 0 || selectData2.prefsIndex == 2) {
          selectedStu.map((item) => {
            enrollList.value.push({
              name: item.name,
              avatarUrl: item.avatarUrl,
              weight: item.weight,
              state: "未缴费",
            });
          });
        } else if (selectData2.prefsIndex == 1 || selectData2.prefsIndex == 3) {
          selectedStu.map((item) => {
            enrollList.value.push({
              name: item.name,
              avatarUrl: item.avatarUrl,
              first: firstPro.arr[item.first - 1],
              second: secondPro.arr[item.second - 1],
              state: "未缴费",
            });
          });
        }
      }
      selindex.value = 3;
    }
  }
}
//取消报名  删除
function cancel(item, index) {
  sourceStuList.value.map((i) => {
    if (i.name === item.name) {
      i.state = false;
    }
  });
  enrollList.value.splice(index, 1);
}

const rules = ref([]);
const announcements = ref([]);
const name = ref();
const addr = ref();
const startTime = ref();
const endTime = ref();

//生成订单号
const order_id = ref("");

function orderCode() {
  order_id.value = "";
  for (
    var i = 0;
    i < 6;
    i++ //6位随机数，用以加在时间戳后面。
  ) {
    order_id.value += Math.floor(Math.random() * 10);
  }
  order_id.value = new Date().getTime() + order_id.value; //时间戳，用来生成订单号。
}
const price = ref(0.01);
const suiji = ref(0);

function pay() {
  orderCode();
  suiji.value = Math.floor(Math.random() * 100000000);
  uniCloud
    .callFunction({
      name: "getOrderInfo",
      data: {
        openid: uni.getStorageSync("openid"),
        name: "测试",
        out_trade: order_id.value, //订单号
        suiji: suiji.value,
        pric: price.value * 100,
      },
    })
    .then((odr) => {
      console.log("OrderInfo", odr);
      uni.hideLoading(); //隐藏loading
      uni.requestPayment({
        // #ifdef MP-WEIXIN
        ...odr.result.orderInfo,
        // #endif
        async success(res) {
          console.log("pay-success-res", res);
          uni.showModal({
            title: "支付成功",
            content: "请和顾问联系执行订单即可！",
          });
          //缴费后调用报名接口
          try {
            let res = selectGameAPI(
              Number(typeC.value),
              Number(id.value),
              obj.value
            );
            console.log("报名成功-res", res);
          } catch (e) {
            console.error(e);
          }
          //缴费后调用支付记录接口
          const obj = {
            age: 0,
            sex: 0,
            id: uni.getStorageSync("openid"),
            name: uni.getStorageSync("userInfo").name,
            birthdate: "2023-03-20T06:27:50.924Z",
            organization: uni.getStorageSync("userInfo").org,
            idCardNumber: "string",
            joinInGold: 0,
            pic: "string",
            base64code1: "string",
            gd: [
              {
                gold_filename: "string",
                base64code2: "string",
              },
            ],
            amount: price.value,
            pay_id: order_id.value,
            weChat_pay_id: suiji.value,
          };
          try {
            let res = await wechatPayCallbackAPI(obj);
            console.log("支付记录更新成功-res", res);
          } catch (e) {
            console.error(e);
          }
          uniCloud
            .callFunction({
              name: "orderQuery",
              data: {
                outTradeNo: order_id.value,
              },
            })
            .then((res) => {
              console.log("orderQuery-res", res);
            });
        },
        fail() {},
        complete(res) {
          console.log("pay-complete-res", res);
          // 支付完成后重新加载该页面
        },
      });
    });
}
const inputDialog = ref(); //报名弹窗
const tmpIdx = ref(); //报名弹窗
function changeSel(index) {
  tmpIdx.value = index;
  //hasPsw:1无需输入密码
  if (!uni.getStorageSync("isLogin")) {
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
//输入报名密码点击确认后
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

const id = ref();
const password = ref();
const hasPsw = ref(true);
onLoad((options) => {
  if (options.selindex) selindex.value = options.selindex;
  if (uni.getStorageSync("enrollObj")) {
    selindex.value = 0;
    hasPsw.value = uni.getStorageSync("enrollObj").hasPsw;
    name.value = uni.getStorageSync("enrollObj").data.name;
    addr.value = uni.getStorageSync("enrollObj").data.address;
    startTime.value = uni.getStorageSync("enrollObj").data.startTime;
    endTime.value = uni.getStorageSync("enrollObj").data.endTime;
    id.value = uni.getStorageSync("enrollObj").data.id;
    password.value = uni.getStorageSync("enrollObj").password;
    uni
      .getStorageSync("enrollObj")
      .data.announcement.split("\n")
      .forEach((item, index) => {
        announcements.value.push(item);
      });
    uni
      .getStorageSync("enrollObj")
      .data.rule.split("\n")
      .forEach((item, index) => {
        rules.value.push(item);
      });
  }
});

/* const typeP = ref(2); */
const typeP = ref(2);
const userInfo = ref(uni.getStorageSync("userInfo"));
onMounted(() => {
  /* 		for(let i = 0;i<16;i++) {
			sourceStuList.value.push({
				id: i,
				name: 'aaa',
				avatarUrl: 'aa',
				state: true,
				weight: 0,
				firstIdx: 0,
				secondIdx: 0,
			})
		} */
  const openid = uni.getStorageSync("openid");
  //获取学生信息
  uni.request({
    url:
      "https://cqshq.top/SendClassmates?org_id=" +
      uni.getStorageSync("userInfo").org_id,
    header: {
      "Content-Type": "application/json",
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
          secondIdx: 0,
        });
      });
    },
  });
});
</script>

<style>
.model {
  position: absolute;
}

/* 项目选择下拉框 */
.msg_picker {
  position: relative;
  top: 16upx;
  left: 36upx;
  border: 2upx solid black;
  font-size: 35upx;
  padding-left: 15upx;
  width: 500upx;
}

.h {
  position: absolute;
  top: 15upx;
  right: 10upx;
  width: 0px;
  border: 20upx solid transparent;
  border-top-color: black;
}

.signUpBtn,
.confirm-btn {
  width: 300rpx;
  background-color: rgb(97, 97, 97);
  color: #fff;
  border: 1px solid #fff;
}

.confirm-btn {
  position: absolute;
  left: 50%;
  bottom: 40rpx;
  transform: translateX(-50%);
}

.payBtn {
  border-radius: 0;
  margin-top: 30rpx;
  width: 300rpx;
}

.content {
  width: 100%;
  height: 400rpx;
  position: relative;
}

/* 背景图片 */
.content .background {
  width: 100%;
  height: 400rpx;
  position: absolute;
  z-index: -1;
}

.content .up-text {
  position: absolute;
  padding-left: 50rpx;
  padding-top: 30rpx;
  font-size: x-large;
  font-weight: 600;
  color: white;
  width: 80%;
  z-index: 1;
}

.content .bottom {
  position: relative;
  padding-left: 50rpx;
  padding-top: 360rpx;
  display: flex;
  z-index: 1;
}

.bottom .text {
  position: absolute;
  padding-left: 30rpx;
  font-size: x-small;
  font-weight: 400;
  color: white;
}

.recongle {
  position: relative;
  margin-top: 5rpx;
  width: 20rpx;
  height: 20rpx;
  background-color: white;
}

/* 中间选择框 */
.index-btns {
  width: 100%;
  height: 100rpx;
  position: relative;
  display: flex;
}

.btn {
  width: 24.7%;
  height: 100rpx;
  position: relative;
  margin-right: 0.4%;
  background-color: #616161;
}

.btn .text {
  position: relative;
  padding-top: 25rpx;
  padding-left: 30rpx;
  font-size: medium;
  color: white;
}

.first {
  position: relative;
  padding-top: 40rpx;
  padding-left: 50rpx;
}

.first .recongle {
  position: relative;
  width: 60rpx;
  height: 15rpx;
  background-color: black;
}

.first .title {
  position: relative;
  padding-top: 10rpx;
  font-size: x-small;
  font-weight: 300;
}

.first .text {
  position: relative;
  padding-top: 40rpx;
  font-size: x-small;
  font-weight: 300;
}

.second {
  width: 750rpx;
  margin-top: 40rpx;
  margin-left: 25rpx;
}

.stu_ipt {
  width: 685rpx;
  height: 70rpx;
  color: black;
  padding-left: 16rpx;
  margin-top: 40rpx;
  margin-left: 25rpx;
  border: 1px solid #404040;
  border-radius: 30rpx;
}

.stu_box {
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150rpx;
  height: 210rpx;
  margin: 13rpx;
  color: #fff;
  font-size: 24rpx;
  background-color: rgb(97, 97, 97);
}

.active {
  background-color: rgb(197, 197, 197);
}

.stu_box image {
  width: 100rpx;
  height: 100rpx;
}

.avatar {
  height: 80px;
  width: 80px;
  border-radius: 40px;
}

.thrid {
  position: relative;
  padding-top: 50rpx;
  margin-left: 76rpx;
}

.thrid .box {
  position: relative;
  margin: 0% auto;
  width: 80%;
  height: 150rpx;
  background-color: #404040;
}

.thrid .recongle {
  position: relative;
  width: 20%;
  height: 40rpx;
  background-color: white;
}

.thrid .top {
  position: relative;
  padding-left: 20rpx;
  font-size: large;
  font-weight: 500;
}

.thrid .text {
  position: relative;
  padding-left: 40rpx;
  padding-top: 0rpx;
  font-size: x-large;
  font-weight: 700;
  color: white;
}

.fourth {
  position: relative;
  padding-top: 30rpx;
}

.fourth .noAdd {
  margin-left: 320rpx;
  color: gray;
}

.fourth .box {
  position: relative;
  margin-top: 25rpx;
  height: 180rpx;
  width: 100%;
  background-color: #818181;
}

.fourth .top {
  text-align: center;
  padding-top: 6rpx;
  font-size: 30rpx;
  font-weight: 400;
  color: white;
}

.fourth .recongle {
  position: relative;
  width: 2%;
  height: 60rpx;
  margin-top: 34rpx;
  margin-left: 60rpx;
}

.fourth .a {
  position: relative;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-bottom: 10rpx;
}

.fourth .text {
  position: relative;
  padding-left: 20rpx;
  padding-top: 30rpx;
  font-size: small;
  font-weight: 200;
  color: white;
}
</style>
