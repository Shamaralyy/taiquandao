<template>
	<view>
		<view class="con">
			<!-- LOGO -->
			<view class="logo_box">
				<view class="text_left"> LOGO: </view>
				<view class="logo-img" @tap="upload">
					<img class="logoImg" :src="logoSrc" mode="aspecFill" />
				</view>
			</view>
			<!-- 武馆名称 -->
			<view class="a">
				<view class="text_left">武馆名称：</view>
				<input v-model="msg.marName" placeholder="请输入武馆名称" style="padding-left: 10rpx" maxlength="30" />
			</view>
			<!-- 联系人 -->
			<view class="a">
				<view class="text_left">联系人：</view>
				<input v-model="msg.name" placeholder="请输入姓名" style="padding-left: 35rpx" />
			</view>
			<!-- 联系电话 -->
			<view class="a">
				<view class="text_left">联系电话：</view>
				<input v-model="msg.phone" type="number" maxlength="11" placeholder="请输入电话"
					style="padding-left: 10rpx" />
			</view>
			<!-- 武馆地址 -->
			<view class="a">
				<view class="text_left">武馆地址：</view>
				<input v-model="msg.address" placeholder="选择地址" @tap="map" style="padding-left: 10rpx" />
			</view>
			<!-- 身份证号 -->
			<view class="a">
				<view class="text_left">身份证号：</view>
				<input v-model="msg.IDcard" type="idcard" maxlength="18" placeholder="请输入身份证号"
					style="padding-left: 10rpx" />
			</view>
			<!-- 武馆简介 -->
			<view class="b">
				<view class="text_left" style="padding-top: 18rpx">武馆简介：</view>
			</view>
			<textarea v-model="msg.marInfo" maxlength="400" placeholder="请输入武馆简介" style="
          width: 667rpx;
          height: 150rpx;
          padding-left: 10rpx;
          padding-top: 5rpx;
          border-bottom: 1px rgb(207, 203, 203) solid;
        "></textarea>
			<!-- 身份证照片 -->
			<view class="id-box">
				<view class="id-text">身份证照片（正-反面）</view>
				<view style="display: flex">
					<view class="id-img" @click="front_upload">
						<img class="idImg" :src="sfzUp_picSrc" mode="aspecFill" />
					</view>
					<view class="id-img" @click="verso_upload" style="padding-left: 25rpx">
						<img class="idImg" :src="sfzDown_picSrc" mode="aspecFill" />
					</view>
				</view>
			</view>
			<!-- 营业执照 -->
			<view class="id-box" style="border-bottom: 0">
				<view class="id-text">营业执照：</view>
				<view style="display: flex">
					<view class="id-img" @click="last_upload">
						<image src="http://39.100.78.225:8002/yyzz.png" mode="aspecFill"></image>
					</view>
				</view>
			</view>
			<!-- 认证武馆 -->
			<button class="button" @tap="submit">认证武馆</button>
		</view>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script setup>
	import {
		guid,
		testReg,
	} from '@/utils/utils.js'
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools'
	import {
		ref,
		reactive
	} from 'vue'
	import upSrc from '../../../static/img.png'
	import downSrc from '../../../static/111.png'
	import {
		useStore
	} from 'vuex'
	const store = useStore();
	//信息
	let msg = reactive({
		marName: '',
		name: '',
		phone: null,
		address: '',
		IDcard: null,
		marInfo: '',
	});
	let logo = ref('');
	let logoSrc = ref('https://img-qn.51miz.com/Element/00/41/38/39/407da9aa_E413839_a95d89b1.png');
	let baseLogo = ref('');
	let sfzUp_pic = ref('');
	let sfzUp_picSrc = ref(upSrc);
	let base_sfzUp_pic = ref('');
	let sfzDown_pic = ref('');
	let sfzDown_picSrc = ref(downSrc);
	let base_sfzDown_pic = ref('');
	let yyzz_pic = ref('');
	let base_yyzz_pic = ref('');

	let showModal = false;

	//弹出层
	let message = ref();
	let msgType = ref('success');
	let messageText = ref('这是一条成功提示');

	async function submit() {
		if (logo.value || sfzUp_pic.value || sfzDown_pic.value || yyzz_pic.value) {
			//logo转为base64
			const base64_logo = await pathToBase64(logo.value);
			baseLogo.value = base64_logo;
			//sfz_up转为base64
			const base64_up = await pathToBase64(sfzUp_pic.value);
			base_sfzUp_pic.value = base64_up;
			//sfz_down转为base64
			const base64_down = await pathToBase64(sfzDown_pic.value);
			base_sfzDown_pic.value = base64_down;
			//yyzz_pic转为base64
			const base64_yyzz = await pathToBase64(yyzz_pic.value);
			base_yyzz_pic.value = base64_down;
		}


		if (msg.marName === '' || msg.name === '' || msg.phone === '' || baseLogo.value === '' || base_sfzUp_pic
			.value === '' ||
			msg.address === '' || base_yyzz_pic.value === '' || msg.IDcard === '请选择出生日期' || msg.marInfo === '' ||
			base_sfzDown_pic.value === '') {
			messageToggle('error', '请确保信息填写完整!');
		} else {
			if (testReg('name', msg.name) && testReg('IDcard', msg.IDcard) && testReg('phone', msg.phone)) {
				uni.request({
					url: 'https://cqshq.top/GetOrgsInfo',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						"id": String(store.state.userInfo.openid.substring(store.state.userInfo.openid.length - 6)),
						"name": String(msg.marName),
						"address": String(msg.address),
						"user_id": store.state.userInfo.openid,
						"contactsName": String(msg.name),
						"contactsTel": String(msg.phone),
						"contactsIdCard": String(msg.IDcard),
						"info": String(msg.marInfo),
						"yyzz_pic": base_yyzz_pic.value.slice(22),
						"filename_yyzz": "yyzz",
						"sfzUp_pic": base_sfzUp_pic.value.slice(22),
						"filename_sfzUp": "sfzUp",
						"sfzDown_pic": base_sfzDown_pic.value.slice(22),
						"filename_sfzDown": "sfzDown",
						"icon": baseLogo.value.slice(22),
						"filename_icon": "icon"
					}
				});
				store.state.isLogin = true;
				messageToggle('success', '提交成功');
			} else {
				messageToggle('error', '请确保姓名、身份证号、联系电话输入正确！');
			}
		}
	}
	// 点击换手机相册或者电脑本地图片
	function upload() {
		processImg(logo,logoSrc,baseLogo);
	};
	
	function front_upload() {
		processImg(sfzUp_pic,sfzUp_picSrc,base_sfzUp_pic);
	};

	function verso_upload() {
		processImg(sfzDown_pic,sfzDown_picSrc,base_sfzDown_pic);
	};

	function last_upload() {
		processImg(yyzz_pic,yyzz_picSrc,base_yyzz_pic);
	};
	
	//选择图片、压缩图片、转为base64
	function processImg(img,imgSrc,base) {
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ["original", "compressed"],
			// 指定是原图还是压缩图，默认两个都有
			sourceType: ["album", "camera"],
			// 指定来源是相册还是相机，默认两个都有
			success: function(res) {
				img.value = res.tempFilePaths[0];
				imgSrc.value = res.tempFilePaths[0];
				wx.compressImage({
						src:res.tempFilePaths[0], // 图片路径
						success: (res) => {
							pathToBase64(res.tempFilePath)
								.then(base64 => {
									base.value = base64;
								})
						},
						fail: (err) => {
							console.log('compress-err',err);
						}
					}
				)
			},
		});
	}

	function map() {
		var that = this;
		wx.chooseLocation({
			success: function(res) {
				msg.address = res.address + res.name;
			},
			fail: function() {
				// fail
			},
			complete: function() {
				// complete
			},
		});
	};

	function messageToggle(type, content) {
		msgType.value = type;
		messageText.value = `${content}`;
		message.value.open();
	};
	

</script>

<style>
	.con {
		width: 90%;
		padding-left: 5%;
	}

	.logo_box {
		width: 100%;
		height: 150rpx;
		border-bottom: 1px rgb(207, 203, 203) solid;
		align-items: center;
		display: flex;
	}

	.text_left {
		font-size: small;
		font-weight: 500;
		padding-left: 3%;
	}

	.a {
		height: 70rpx;
		width: 100%;
		border-bottom: 1px rgb(207, 203, 203) solid;
		align-items: center;
		display: flex;
	}

	.b {
		height: 50rpx;
		width: 100%;
		/* align-items: center; */
		/* display: flex; */
	}

	.logoImg {
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
	}

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		padding-left: 60rpx;
		/* margin: 0 auto; */
	}

	.logo-img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		box-shadow: 0px 2rpx 8rpx 0rpx rgba(150, 150, 150, 0.6);
	}

	.id-box {
		width: 100%;
		height: 285rpx;
		border-bottom: 1px rgb(207, 203, 203) solid;
	}

	.id-text {
		font-size: small;
		font-weight: 500;
		padding-left: 1%;
		padding-top: 18rpx;
		padding-bottom: 18rpx;
	}

	.idImg {
		width: 323upx;
	}

	.id-img {
		width: 325rpx;
		height: 200rpx;
	}

	.id-img image {
		width: 100%;
		height: 100%;
		box-shadow: 0px 2rpx 8rpx 0rpx rgba(150, 150, 150, 0.6);
	}

	.button {
		background-color: rgb(247, 120, 98);
		color: white;
		width: 70%;
	}
</style>
