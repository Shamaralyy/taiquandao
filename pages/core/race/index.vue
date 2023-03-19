<template>
	<view>
		<view class="nav">
			<view @tap="n = 1" :style="n===1?'background-color:rgb(246,134,133);color: #fff;font-weight: 600;':''">金牌
			</view>
			<view @tap="n = 2" :style="n===2?'background-color:rgb(246,134,133);color: #fff;font-weight: 600;':''">银牌
			</view>
			<view @tap="n = 3" :style="n===3?'background-color:rgb(246,134,133);color: #fff;font-weight: 600;':''">铜牌
			</view>
			<view @tap="n = 4" :style="n===4?'background-color:rgb(246,134,133);color: #fff;font-weight: 600;':''">优胜
			</view>
			<view @tap="n = 5" :style="n===5?'background-color:rgb(246,134,133);color: #fff;font-weight: 600;':''">鼓励奖
			</view>
		</view>
		<view class="type_box" >
			<text style="color: rgb(246, 134, 133);margin-left:13rpx">个人竞技</text>
			<song-data-picker class="mar_picker" :localdata="marList" popup-title="请选择武馆名称" :openSearch="true"
				@change="onchange" @nodeclick="onnodeclick"></song-data-picker>
		</view>

		<view class="list">
			<view class="list_box">
				<view class="order">
					<text>1</text>
				</view>
				<view class="text_area">
					<view class="text_msg">
						<view>姓名：袁明鑫</view>
						<view>性别：男</view>
						<view>2011年</view>
						<view>胜：2 败：1</view>
					</view>
				</view>
				<text class="weight">体重：32kg</text>
			</view>

			<view class="list_box">
				<view class="order">
					<text>2</text>
				</view>
				<view class="text_area">
					<view class="text_msg">
						<view>姓名：袁明鑫</view>
						<view>性别：男</view>
						<view>2011年</view>
						<view>胜：2 败：1</view>
					</view>
				</view>
				<text class="weight">体重：32kg</text>
			</view>
			
			<view class="list_box">
				<view class="order">
					<text>3</text>
				</view>
				<view class="text_area">
					<view class="text_msg">
						<view>姓名：袁明鑫</view>
						<view>性别：男</view>
						<view>2011年</view>
						<view>胜：2 败：1</view>
					</view>
				</view>
				<text class="weight">体重：32kg</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		getCurrentInstance,
		onMounted,
	} from 'vue'
	let n = ref(1);
	let marList = ref([]); //武馆
	function onchange(e) {
		const value = e.detail.value;
	}

	function onnodeclick(node) {}
	//获取武馆列表
	onMounted(() => {
		uni.request({
			url: 'https://cqshq.top/SendOrgsInfo',
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				let i = 1;
				let marlist = [];
				JSON.parse(res.data).forEach(item => {
					marlist.push({
						'text': item.name,
						'value': (i++).toString()
					});
				});
				marList.value = marlist;
				console.log('marList.value1 ', marList.value);
			}
		});
		console.log('marList.value2', marList.value);
	});
</script>
<style>
	.nav {
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		font-size: 28rpx;
	}

	.nav view {
		width: 20%;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.mar_picker {
		width: 200rpx;
		background-color: #fff;
	}

	.type_box {
		width: 100%;
		height: 150rpx;
		line-height: 70rpx;
		background-color: #fff;
		font-size: 28rpx;
	}

	.list {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50rpx;
		width: 100%;
		height: 950rpx;
	}

	.list_box {
		position: relative;
		width: 95%;
		height: 230rpx;
		background-color: #fff;
		border-radius: 25rpx;
		margin-bottom: 26rpx;
	}

	.order {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		border-radius: 15rpx;
		top: 30rpx;
		left: 23rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: rgb(208, 208, 208);
	}

	.order text {
		color: #fff;
		font-size: 40rpx;
	}

	.text_area {
		position: absolute;
		right: 20rpx;
		width: 530rpx;
		height: 160rpx;
		border-bottom: 1px solid lightgrey;
	}

	.text_msg {
		position: absolute;
		right: 0rpx;
		width: 450rpx;
		height: 140rpx;
	}

	.text_msg view {
		float: left;
		width: 200rpx;
		margin-top: 25rpx;
		margin-left: 20rpx;
	}

	.weight {
		position: absolute;
		left: 158rpx;
		bottom: 20rpx;
	}
</style>
