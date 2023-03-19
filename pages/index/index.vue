<template>
	<view class="home">
		<image class="me_bg" src="http://39.100.78.225:8002/background.png" mode=""></image>
		<view class="block"></view>
		<text class="race">赛事</text>
		<view class="taiquandao" @tap="toTaiquandao">
			<image src="../../static/3.png"></image>
			<text style="margin-top: -20upx;">跆拳道</text>
		</view>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	//弹出层
	let message = ref();
	let msgType = ref('success');
	let messageText = ref('这是一条成功提示');

	function toTaiquandao() {
		uni.navigateTo({
			url: '/pages/core/taekwondo/index'
		});
	};

	function messageToggle(type, content) {
		msgType.value = type;
		messageText.value = `${content}`;
		message.value.open();
	};

	onMounted(() => {
		if (!wx.getStorageSync('openid')) uni.setStorageSync('isLogin', false);
		else {
			//判断是否注册
			uni.request({
				url: 'https://cqshq.top/Login?id=' + uni.getStorageSync('openid'),
				header: {
					'Content-Type': 'application/json'
				},
				success: (res) => {
					console.log('Login-res', res);
					if (res.statusCode === 404) {
						uni.clearStorageSync();
						uni.setStorageSync('isLogin', false);
					} else {
						uni.setStorageSync('userInfo', res.data);
						uni.setStorageSync('type', res.data.character);
						uni.setStorageSync('isLogin', true);
					}
				}
			});
		}
	})
</script>

<style>
	.home {
		width: 100vw;
		height: 100vh;
		background: -webkit-linear-gradient(top, rgb(10, 12, 14)40%, rgb(72, 58, 43));
		z-index: -2;
	}

	.me_bg {
		position: absolute;
		width: 100vw;
		height: 470upx;
	}

	.block {
		position: absolute;
		top: 530upx;
		width: 40upx;
		height: 50upx;
		background-color: rgb(218, 220, 219);
		left: 60upx;
	}

	.race {
		position: absolute;
		top: 525upx;
		left: 120upx;
		color: #fff;
		font-size: 42upx;
		font-weight: 550;
	}

	.taiquandao {
		display: flex;
		flex-direction: column;
		color: #fff;
		text-align: center;
		position: absolute;
		top: 620upx;
		left: 20upx;
		z-index: 1;
	}

	image {
		width: 170upx;
		height: 150upx;
	}
</style>
