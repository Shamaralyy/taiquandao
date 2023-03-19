<template>
	<view>
		<ul>
			<li>
				<view class="participants" style="justify-content: start;">
					<text class="title" style="width:234rpx">选择头像：</text>
					<avatar selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="avatarSrc"
						class="logo-img"
						avatarStyle="width: 120rpx; height: 120rpx;border:1px solid rgba(150, 150, 150, 0.6);box-shadow: 0px 2rpx 8rpx 0rpx rgba(150, 150, 150, 0.6);">
					</avatar>
				</view>
			</li>
			<li>
				<view class="participants">
					<text class="title">参赛人员姓名:</text>
					<input type="text" placeholder="请输入姓名" v-model="userMsg.name" @input="handleInput" />
				</view>
			</li>
			<li>
				<view class="participants">
					<text class="title">参赛道馆名称:</text>
					<song-data-picker class="part_picker" :localdata="marList" popup-title="请选择武馆名称" :openSearch="true"
						@change="onchange" @nodeclick="onnodeclick"></song-data-picker>
				</view>
			</li>
			<li>
				<view class="participants">
					<text class="title">参赛人员身份证号:</text>
					<input type="idcard" placeholder="请输入身份证号" maxlength="18" @input="identifyIDcard"
						v-model="userMsg.IDcard" />
				</view>
			</li>
			<li>
				<view class="participants">
					<text class="title">运动员性别:</text>
					<text class="auto_msg">{{userMsg.sex}}</text>
				</view>
			</li>
			<li>
				<view class="participants">
					<text class="title">运动员出生日期:</text>
					<text class="auto_msg">{{userMsg.date}}</text>
				</view>
			</li>

			<li>
				<view class="participants">
					<text class="title">是否申报冠军赛资格:</text>
					<view class="qualification">
						<radio-group name="sex" @change="radioChange">
							<label>
								<radio value="1" /><text>是</text>
							</label>
							<label style="box-sizing: border-box;margin-left: 50upx;">
								<radio value="0" /><text>否</text>
							</label>
						</radio-group>
					</view>
				</view>
			</li>
			<li v-show="isShow">
				<view class="participants uploadImg">
					<text class="title">获奖证明:</text>
					<uni-file-picker @getIndex="getIndex" ref="files" fileMediatype="image" mode="grid" @select="select"
						:limit="1" :auto-upload="false" />
				</view>
			</li>
		</ul>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
		<label class="check">
			<label>
				<checkbox value="cb" @tap="changeCheck" :checked="isChecked" color="green" />
			</label>我已同意并仔细阅读<a class="agreement" style="display: inline;" href="#">《用户隐私协议》</a>同意书
		</label>
		<button class="btn_check" type="warn" @tap="postPersonalData">完善个人信息</button>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		getCurrentInstance,
		onMounted,
	} from 'vue'
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools'
	import {
		testReg,
		getAge
	} from '@/utils/utils.js'
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import avatar from "@/components/yq-avatar/yq-avatar.vue"
	const openid = ref(uni.getStorageSync('openid'));
	//获奖证明
	let isShow = ref(false);
	let hjzm = ref([]); //获奖证明名字
	let baseHjzm = ref([]); //获奖证明base64格式
	let isDisabled = ref(false);
	let baseImgSrc = ref([]); //头像base64格式
	let hjzmArr = ref([{
		"gold_filename": null,
		"base64code2": null
	}]);
	//信息
	let avatarSrc = ref('https://img-qn.51miz.com/Element/00/41/38/39/407da9aa_E413839_a95d89b1.png'); //头像
	let baseAvatar = ref(''); //头像
	let avatarName = ref('');
	let marList = ref([]); //武馆
	let userMsg = ref({
		name: '',
		marName: '',
		mar_n: 1,
		IDcard: '',
		sex: '未知',
		sexNum: 1,
		isDeclared: '',
		date: '请选择出生日期',
	});
	let isChecked = ref(true);
	//弹出层
	let message = ref();
	let msgType = ref('success');
	let messageText = ref('这是一条成功提示');
	//refs
	let files = ref();
	let index = ref();

	function getIndex(e) {
		index.value = e;
		hjzm.value.splice(index.value, 1);
		baseHjzm.value.splice(index.value, 1);
	};
	//姓名不能输入特殊字符
	function handleInput(e) {
		userMsg.value.name = validateNumber(e.detail.value);
	};

	function validateNumber(val) {
		return val.replace(/[^\u4e00-\u9fa5]/g, '')
	};
	//选择头像
	function myUpload(rsp) {
		avatarSrc.value = rsp.path;
		avatarName.value = avatarSrc.value.slice(12, 22);
		wx.compressImage({
			src: avatarSrc.value, // 图片路径
			success: (res) => {
				pathToBase64(res.tempFilePath)
					.then(base64 => {
						baseAvatar.value = base64;
					})
			},
			fail: (err) => {
				console.log('compress-err', err);
			}
		})
	}
	//选择获奖证明
	function select(e) {
		e.tempFiles.forEach(i => {
			hjzm.value.push(i.name);
		});
		e.tempFilePaths.forEach(i => {
			wx.compressImage({
				src: i, // 图片路径
				success: (res) => {
					pathToBase64(res.tempFilePath)
						.then(base64 => {
							baseHjzm.value.push(base64.slice(22));
						})
				},
				fail: (err) => {
					console.log('compress-err', err);
				}
			})
		});
	};

	function onchange(e) {
		const value = e.detail.value;
	}

	//选择武馆
	const org_id = ref();

	function onnodeclick(node) {
		userMsg.value.marName = node.text;
		org_id.value = node.value;
		console.log('org_id.value', org_id.value);
	}

	function changeCheck() {
		isChecked.value = !isChecked.value;
	}


	function radioChange(e) {
		userMsg.value.isDeclared = e.detail.value;
		if (userMsg.value.isDeclared === '1') {
			isShow.value = true;
		} else {
			isShow.value = false;
		};
	};

	function messageToggle(type, content) {
		msgType.value = type;
		messageText.value = `${content}`;
		message.value.open();
	};

	function identifyIDcard() {
		if (testReg('IDcard', userMsg.value.IDcard)) {
			message.value.close();
			userMsg.value.sex = IdCard(userMsg.value.IDcard, 2);
			userMsg.value.date = IdCard(userMsg.value.IDcard, 1);
		} else {
			messageToggle('error', '请输入正确的身份证号！');
		}
	};

	const addStu = ref(false);

	function getInfo() {
		if (addStu.value) {
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/core/enroll/index?selindex=' + 2
				});
			}, 50);
		} else {
			uni.request({
				url: 'https://cqshq.top/Login?id=' + openid.value,
				header: {
					'Content-Type': 'application/json'
				},
				success: (res) => {
					console.log('Login-res', res);
					uni.setStorageSync('userInfo', res.data);
					uni.setStorageSync('type', res.data.type);
					uni.setStorageSync('isLogin', true);
					//提交后 登录状态变更为true
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/me/index'
						});
					}, 50);
				}
			});
		}
	}

	function postPersonalData() {
		if (userMsg.value.sex === '男') {
			userMsg.value.sexNum = 1;
		} else {
			userMsg.value.sexNum = 0;
		};
		if (baseAvatar.value === '' || userMsg.value.name === '' || userMsg.value.marName === '' || userMsg.value
			.IDcard === '' || userMsg.value.sex === '未知' || userMsg.value.date === '请选择出生日期' || userMsg.value
			.isDeclared === '' || avatarName.value === '') {
			console.log('age', Number(getAge(userMsg.value.date)));
			console.log('sex', Number(userMsg.value.sexNum));
			console.log('id', openid.value);
			console.log('name', String(userMsg.value.name));
			console.log('birthdate', String(userMsg.value.date));
			console.log('userMsg.value.date', userMsg.value.date);
			console.log('organization', String(userMsg.value.marName));
			console.log('idCardNumber', String(userMsg.value.IDcard));
			console.log('joinInGold', Number(userMsg.value.isDeclared));
			console.log('pic', avatarName.value.slice(0, avatarName.value.length - 4));
			console.log('base64code1', String(baseAvatar.value.slice(22)));
			console.log('gd', hjzmArr.value);
			messageToggle('error', '请确保信息填写完整!');
		} else {
			if (isChecked.value === false) {
				messageToggle('warn', '请勾选《用户隐私协议》同意书');
				return;
			}
			// 校验身份证：
			if (testReg('name', userMsg.value.name) && testReg('IDcard', userMsg.value.IDcard)) {
				if (userMsg.value.isDeclared === 'true' && baseHjzm.value.length === 0) {
					messageToggle('warn', '需提供获奖证明');
				} else {
					hjzmArr.value = [{
						"gold_filename": null,
						"base64code2": null
					}];
					if (userMsg.value.isDeclared) {
						hjzmArr.value = [];
						for (let i = 0; i < hjzm.value.length; i++) {
							hjzmArr.value.push({
								"gold_filename": null,
								"base64code2": null
							});
							hjzmArr.value[i].gold_filename = hjzm.value[i];
							hjzmArr.value[i].base64code2 = baseHjzm.value[i];
						};
					};
					if (addStu.value) {
						uni.request({
							url: 'https://cqshq.top/AddPlayer?org_id=' + org_id.value,
							method: 'POST',
							header: {
								'Content-Type': 'application/json'
							},
							data: {
								"age": Number(getAge(userMsg.value.date)),
								"sex": Number(userMsg.value.sexNum),
								"id": openid.value,
								"name": String(userMsg.value.name),
								"birthdate": String(userMsg.value.date),
								"organization": String(userMsg.value.marName),
								"idCardNumber": String(userMsg.value.IDcard),
								"joinInGold": Number(userMsg.value.isDeclared),
								"pic": avatarName.value.slice(0, avatarName.value.length - 4),
								"base64code1": String(baseAvatar.value.slice(22)),
								"gd": hjzmArr.value
							},
							success: (res) => {
								console.log('reg-res', res);
								if (res.statusCode === 400) {
									messageToggle('warn', '您已注册！');
								} else {
									messageToggle('success', '提交成功');
									getInfo();
								}
							},
							fail: (err) => {
								console.log('reg-err', err);
							}
						});
					} else {
						uni.request({
							url: 'https://cqshq.top/GetUsersInfo?org_id=' + org_id.value,
							method: 'POST',
							header: {
								'Content-Type': 'application/json'
							},
							data: {
								"age": Number(getAge(userMsg.value.date)),
								"sex": Number(userMsg.value.sexNum),
								"id": openid.value,
								"name": String(userMsg.value.name),
								"birthdate": String(userMsg.value.date),
								"organization": String(userMsg.value.marName),
								"idCardNumber": String(userMsg.value.IDcard),
								"joinInGold": Number(userMsg.value.isDeclared),
								"pic": avatarName.value.slice(0, avatarName.value.length - 4),
								"base64code1": String(baseAvatar.value.slice(22)),
								"gd": hjzmArr.value
							},
							success: (res) => {
								console.log('reg-res', res);
								if (res.statusCode === 400) {
									messageToggle('warn', '您已注册！');
								} else {
									messageToggle('success', '提交成功');
									getInfo();
								}
							},
							fail: (err) => {
								console.log('reg-err', err);
							}
						});
					}
				}
			} else {
				messageToggle('error', '请输入正确的姓名和身份证号！');
			}
		}
	};

	//根据身份证号识别，当type=1时获取出生日期,type=2时获取性别
	function IdCard(IdCard, type) {
		if (type === 1) {
			//获取出生日期
			let birthday = IdCard.substring(6, 10) + "-" + IdCard.substring(10, 12) + "-" + IdCard.substring(
				12, 14)
			return birthday
		}
		if (type === 2) {
			//获取性别
			if (parseInt(IdCard.substr(16, 1)) % 2 === 1) {
				return "男"
			} else {
				return "女"
			}
		}
	};
	//获取武馆列表
	onMounted(() => {
		uni.request({
			url: 'https://cqshq.top/SendOrgsInfo',
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log('SendOrgsInfo-res', res);
				let i = 1;
				let marlist = [];
				JSON.parse(res.data).forEach(item => {
					marlist.push({
						'text': item.name,
						'value': item.id
					});
				});
				marList.value = marlist;
				console.log('marList.value1 ', marList.value);
			}
		});
		console.log('marList.value2', marList.value);
	});

	onLoad((options) => {
		addStu.value = options.addStu;
		console.log('addStu.value', addStu.value);
		if (addStu.value) openid.value = '000000';
		console.log('openid.value', openid.value);
	});
</script>

<style scoped>
	ul {
		list-style: none;
	}

	.participants {
		margin-left: 25upx;
		display: flex;
		width: 700upx;
		line-height: 90upx;
		border-bottom: 1px solid lightgray;
		justify-content: space-between;

	}

	.logo-img {
		padding-left: 60rpx;
		padding-top: 20rpx;
		margin-bottom: -12rpx
	}

	.qualification {
		width: 357upx;
		height: 90upx;
	}

	.auto_msg {
		width: 400upx;
	}

	.participants input,
	.part_picker {
		width: 400upx;
		height: 90upx;
		line-height: 90upx;
	}

	.part_picker {
		margin-top: 20rpx;
	}

	.participants .title {
		font-size: 25rpx;
	}

	.uploadedlist {
		width: 530upx;
		height: 210upx;
		margin-bottom: 20upx;
	}

	.uploaded {
		float: left;
		width: 200upx;
		height: 200upx;
	}

	.btn_check {
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		bottom: 30upx;
		width: 630upx;
		border-radius: 45upx;
	}

	.check {
		display: block;
		font-size: 26upx;
		margin-left: 30upx;
		margin-top: 140upx;
	}

	.agreement {
		text-decoration: none;
		color: rgb(236, 147, 105);
	}

	.uploadbox {
		float: left;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20upx;
		margin-right: 290upx;
		width: 200upx;
		height: 200upx;
		border: 2px solid lightgray;
	}

	.i_uploadImg {
		width: 100upx;
		height: 100upx;
	}
</style>
