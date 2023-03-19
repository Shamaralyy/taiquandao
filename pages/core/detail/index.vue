<template>
	<view>
		<!--index.wxml-->
		<view class="content">
			<view class="logo-bg">
				<image class="logo" src="http://39.100.78.225:8002/background.png" mode=""></image>
				<view style="padding-left:40rpx;padding-top: 60rpx;">
					<view class="rectange" style="background-color: #fff;"></view>
					<view style="font-size: x-large;font-weight: 700;padding-top: 10rpx;">{{name}}</view>
					<view style="font-size: xx-small;padding-top: 20rpx;">|{{type}}|</view>
				</view>
				<!-- 第一个小矩形 -->
				<view style="padding-left:40rpx;padding-top: 40rpx;">
					<view class="rectange_low" style="background-color: #fff;"></view>
					<view class="first">
						<text>{{info}}</text>
					</view>
				</view>
				<!-- 第二个小矩形 -->
				<view style="padding-left:40rpx;padding-top: 30rpx;">
					<view class="rectange_low" style="background-color: #fff;"></view>
					<view style="font-size: larger;font-weight: 600;padding-top: 15rpx;">正在进行</view>
					<view style="display: flex;padding-top: 20rpx;">
						<view class="second_left">剩余时间：</view>
						<view class="second_right">{{remainingDays}}天</view>
					</view>
				</view>
			</view>
			<!-- 图标 -->
			<view class="iconTextBox">
				<view class="iconText" @tap="toEnroll(0)">
					<image class="img" src="../../static/a16.png"></image>
					<text>赛事章程</text>
				</view>
				<view class="iconText" @tap="toEnroll(1)">
					<image class="img" src="../../static/a15.png"></image>
					<text>报名参赛</text>
				</view>
				<view class="iconText" @tap="toMedal">
					<image class="img" src="../../static/a2.png"></image>
					<text>比赛安排</text>
				</view>
				<view class="iconText" @tap="toScore">
					<image class="img" src="../../static/a17.png"></image>
					<text>奖牌榜</text>
				</view>
			</view>
			<!-- 第三个小矩形 -->
			<view style="padding-left:40rpx;padding-top: 50rpx;">
				<view class="rectange_low"></view>
				<view style="display: flex;padding-top: 20rpx;">
					<view class="third_left">报名时间：</view>
					<view class="third_right">{{competeTime}}</view>
				</view>
				<view style="display: flex;padding-top: 10rpx;">
					<view class="third_left">比赛时间：</view>
					<view class="third_right">{{startTime}} ~ {{endTime}}</view>
				</view>
				<view style="display: flex;padding-top: 10rpx;">
					<view class="third_left">比赛地点：</view>
					<view class="third_right">{{address}}</view>
				</view>
				<view style="display: flex;padding-top: 10rpx;">
					<view class="third_left">联系方式：</view>
					<view class="third_right">{{ContactsTel}}</view>
				</view>
			</view>
			<view style="padding-left:40rpx;padding-top: 50rpx;">
				<view class="rectange_low"></view>
				<view style="padding-top: 10rpx;">
					<view class="third_left">合作单位：</view>
					<view class="third_right" v-for="item in sponsor" :key="item">{{item}}</view>
				</view>
			</view>
			<view style="padding-left:40rpx;padding-top: 60rpx;">
				<view class="rectange_low"></view>
				<view style="display: flex;padding-top: 20rpx;">
					<view class="third_left">主要比赛项目：</view>
					<view class="third_right">XXXX</view>
				</view>
			</view>
		</view>
		<!-- 报名输入密码弹出框 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="报名密码" placeholder="请输入报名密码(6位数) "
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app';
	const id = ref();
	const name = ref();
	const type = ref();
	const address = ref();
	const info = ref();
	const startTime = ref();
	const endTime = ref();
	const competeTime = ref();
	const ContactsTel = ref();
	const remainingDays = ref();
	const sponsor = ref([]);
	const password = ref(uni.getStorageSync('password')); //报名密码
	const inputDialog = ref(); //报名弹窗
	//要传到报名界面的公告和规则、比赛信息
	let data = {
		id: '',
		announcement: '',
		rule: '',
		name: '',
		address: '',
		startTime: '',
		endTime: ''
	}
	//弹出层
	let message = ref();
	let msgType = ref('success');
	let messageText = ref('这是一条成功提示');

	function messageToggle(type, content) {
		msgType.value = type;
		messageText.value = `${content}`;
		message.value.open();
	};

	function navToEnroll(hasPsw) { //hasPsw为false时 在报名页面点击后三个页面需要输入报名密码
		console.log('password.value', password.value);
		let enrollObj = {
			id: id.value,
			password: password.value,
			data: data,
			hasPsw: hasPsw
		};
		console.log('enrollObj', enrollObj);
		uni.setStorageSync('enrollObj', enrollObj);
		uni.navigateTo({
			url: '/pages/core/enroll/index?id=' + encodeURIComponent(JSON.stringify(id
					.value)) +
				'&password=' + encodeURIComponent(JSON.stringify(password.value)) + '&data=' +
				encodeURIComponent(JSON.stringify(data)) + '&hasPsw=' + hasPsw
		});
	}

	function toScore() {
		uni.navigateTo({
			url: '/pages/core/race/index'
		})
	};

	function toEnroll(flag) { //flag为1:需要输入密码   为0:无需输入密码
		if (flag) {
			if (uni.getStorageSync('isLogin')) {
				inputDialog.value.open()
			} else {
				messageToggle('warn', '请先登录!')
			}
		} else navToEnroll(0);
	};
	//输入报名密码点击确认后
	function dialogInputConfirm(val) {
		if (val.length !== 6) {
			messageToggle('warn', '请输入六位数密码！');
		} else {
			if (password.value == val) {
				setTimeout(() => {
					navToEnroll(1);
				}, 100)
			} else {
				console.log('password.value', password.value);
				console.log('val', val);
				messageToggle('error', '密码错误!');
			}
		}
	}

	function toMedal() {
		uni.navigateTo({
			url: '/pages/core/medal/index'
		});
	};

	onLoad((options) => {
		id.value = options.id;
		data.id = id.value;
	});
	//接收race传递的参数
	onMounted(() => {
		uni.request({
			url: 'https://cqshq.top/SendGamesDetails?id=' + id.value,
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log('SendGamesDetails-res', JSON.parse(res.data));
				name.value = JSON.parse(res.data).name;
				type.value = JSON.parse(res.data).type;
				address.value = JSON.parse(res.data).address;
				info.value = JSON.parse(res.data).info;
				startTime.value = JSON.parse(res.data).startTime;
				endTime.value = JSON.parse(res.data).endTime;
				competeTime.value = JSON.parse(res.data).competeTime;
				ContactsTel.value = JSON.parse(res.data).ContactsTel;
				remainingDays.value = JSON.parse(res.data).remainingDays;
				JSON.parse(res.data).sponsor.split('\n').forEach((item, index) => {
					sponsor.value.push(item);
				});
				data.announcement = JSON.parse(res.data).announcement;
				data.rule = JSON.parse(res.data).rule;
				data.name = JSON.parse(res.data).name;
				data.address = JSON.parse(res.data).address;
				data.startTime = JSON.parse(res.data).startTime;
				data.endTime = JSON.parse(res.data).endTime;
				uni.setStorageSync('password', JSON.parse(res.data).psw)
				password.value = JSON.parse(res.data).psw;
				console.log('password111', password.value);
			}
		});
		console.log('password.value', password.value);
	})
</script>

<style>
	/**index.wxss**/

	.logo-bg {
		color: white;
		margin-bottom: 60rpx;
	}

	.logo {
		position: absolute;
		width: 100vw;
		height: 490rpx;
		z-index: -1;
	}

	.content {
		position: absolute;
	}

	.rectange {
		background-color: black;
		height: 70rpx;
		width: 40rpx;
	}

	.rectange_low {
		background-color: black;
		height: 10rpx;
		width: 40rpx;
	}

	.first {
		padding-top: 20rpx;
		font-size: x-small;
		font-weight: 600;
	}

	.second_left {
		font-size: small;
		font-weight: 600;
	}

	.second_right {
		font-size: small;
	}

	.third_left {
		font-size: small;
		font-weight: 600;
	}

	.third_right {
		font-size: small;
	}

	.img {
		height: 50rpx;
		width: 50rpx;
		filter: invert(100%);
	}

	.iconTextBox {
		width: 750rpx;
		display: flex;
		justify-content: space-around;
		margin-top: 30rpx;
		font-size: 28rpx;
	}

	.iconText {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 130rpx;
		height: 130rpx;
	}
</style>
