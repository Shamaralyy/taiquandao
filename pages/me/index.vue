<template>
	<view class="me">
		<image class="me_bg" src="http://39.100.78.225:8002/background.png" mode=""></image>
		<view class="content">
			<!-- 头部 -->
			<view class="me_tit">
				<view class="me_tit_head">
					<image @tap="getUserInfo" class="logo" :src="user.avatarUrl"></image>
				</view>
				<view class="xinxi">
					<text class="nickname">{{ user.nickName }}</text><br />
					<text class="pname">{{user.organization}}</text>
				</view>
			</view>

			<!-- 统计 -->
			<view class="tongji" v-if="isLogin === true">
				<view class="point">
					<text>战绩</text>
					<text>{{user.win}}胜/{{user.lose}}负</text>
				</view>
				<view class="point">
					<text>积分</text>
					<text>{{user.points}}</text>
				</view>
				<view>
					<text>胜率</text>
					<text>{{user.rate}}%</text>
				</view>
			</view>

			<!-- 未登录 -->
			<view class="login_box" v-if="!isLogin">
				<image class="weixin" src="../../static/weixin.png" @tap="getUserInfo"></image>
			</view>

			<!-- 功能列表内容 -->
			<view class="me_list_box" v-if="isLogin">
				<view>
					<view class="me_list" @tap="toPage('msg')">
						<image class="icon" src="/static/9.png"></image>
						<text>个人信息</text>
					</view>
					<view class="me_list" @tap="toScore">
						<image class="icon" src="/static/4.png"></image>
						<text>我的赛事</text>
					</view>
					<view class="me_list" @tap="pai_page">
						<image class="icon" src="/static/5.png"></image>
						<text>排名榜单</text>
					</view>
				</view>
				<view>
					<view class="me_list" @tap="toJudge">
						<image class="icon" src="/static/8.png"></image>
						<text>申请武馆裁判</text>
					</view>
					<view class="me_list" @tap="toMarCert">
						<image class="icon" src="/static/7.png"></image>
						<text>武馆认证</text>
					</view>
					<view class="me_list" @tap="lianxi_btn">
						<image class="icon" src="/static/6.png"></image>
						<text>联系我们</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import grey from '../../static/grey.png'
	//用户信息
	let user = ref({
		avatarUrl: grey,
		nickName: '未登录',
		organization: '登录查看组织',
		win: 0,
		lose: 0,
		points: 0,
	})
	//胜率
	user.value.rate = computed(() => {
		if (user.value.win + user.value.lose === 0) return 0;
		return ((user.value.win / (user.value.win + user.value.lose)) * 100).toFixed(2);
	})

	//判断是否登录
	const isLogin = ref(uni.getStorageSync('isLogin'));

	function showUserInfo() {
		const userInfo = uni.getStorageSync('userInfo');
		isLogin.value = true;
		user.value.nickName = userInfo.name;
		user.value.organization = userInfo.org;
		user.value.win = userInfo.win;
		user.value.lose = userInfo.lose;
		user.value.points = user.value.win * 10 + user.value.lose * 5;
		user.value.avatarUrl = userInfo.photo;
	}
	
	function toPage(route) {
		uni.navigateTo({
			url: `/pages/core/`+route+`/index`
		});
	}

	function toPersonalData() {
		uni.navigateTo({
			url: '/pages/core/register/index'
		});
	};

	function toScore() {
		uni.navigateTo({
			url: '/pages/core/race/index'
		})
	};

	function toMarCert() {
		uni.navigateTo({
			url: '/pages/core/marCert/index'
		});
	};

	function toJudge() {
		uni.navigateTo({
			url: '/pages/core/judge/login'
		});
	};

	function getInfo() {
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
					uni.setStorageSync('openid', openid.value);
					console.log('获取openid第二次', uni.getStorageSync('openid'));
					toPersonalData();
					console.log('isLogin.value', isLogin.value);
				} else {
					uni.setStorageSync('userInfo', res.data);
					uni.setStorageSync('type', res.data.type);
					uni.setStorageSync('isLogin', true);
					showUserInfo();
				};
			}
		});
	}
	
	const openid = ref();

	//点击微信登录按钮
	function getUserInfo() {
		uni.getUserProfile({
			lang: 'zh_CN',
			desc: '用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，
			success: (res) => {
				console.log('getUserProfile-res', res)
				uni.login({
					provider: "weixin",
					success: async function(res) {
						console.log('---res----', res)
						const openidFn = uniCloud.importObject("openid");
						openid.value = await openidFn.getOpenid(res.code);
						try {
							uni.setStorageSync('openid', openid.value);
							console.log('获取openid', uni.getStorageSync('openid'));
						} catch (e) {
							console.log('缓存openid失败!');
						};
						getInfo();
					},
				});
			},
			fail: (err) => {}
		});
	};

	onMounted(() => {
		console.log('isLogin', isLogin.value);
		console.log('userInfo', uni.getStorageSync('userInfo'));
		if (uni.getStorageSync('userInfo')) showUserInfo();
	})
</script>

<style scoped>
	.me {
		width: 100vw;
		height: 100vh;
		background: -webkit-linear-gradient(top, rgb(10, 12, 14)40%, rgb(72, 58, 43));
		z-index: -2;
	}

	.weixin {
		margin-top: 200upx;
		width: 440upx;
		height: 80upx;
	}

	.me_bg {
		position: absolute;
		width: 100vw;
		opacity: 40%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.me_tit {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 750upx;
		height: 410upx;
		border-bottom: 1px solid #fff;
		text-align: center;
		z-index: 1;
	}

	.me_tit image {
		border-radius: 50%;
	}

	.nickname {
		font-size: 50upx;
		font-weight: 600;
	}

	.pname {
		font-size: 30upx;
	}

	.point::before {
		position: absolute;
		content: "";
		width: 214upx;
		height: 50upx;
		border-right: 1px solid #fff;
		z-index: 2;
	}

	.logo {
		height: 148rpx;
		width: 148rpx;
		border: 30rpx;
		margin: 20rpx auto 20rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	/* 统计 */
	.tongji {
		display: flex;
		justify-content: center;
		align-content: space-between;
		width: 620upx;
		height: 131upx;
		text-align: center;
		font-size: 25upx;
		z-index: 1;
	}

	.tongji view {
		display: flex;
		width: 250upx;
		height: 131upx;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}

	/* 功能列表 */
	.me_list_box {
		margin-top: 45upx;
		display: flex;
		flex-direction: column;
		width: 750upx;
		height: 420upx;
		z-index: 1
	}

	.me_list_box view {
		display: flex;
		justify-content: center;
	}

	.me_list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 170upx;
		height: 180upx;
		margin: 18upx;
		font-size: 28upx;
	}

	.me_list .icon {
		width: 104upx;
		height: 104upx;
		margin-left: 13upx;
	}

	.me_list text {
		margin-top: 10upx;
	}
</style>
