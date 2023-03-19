<template>
	<view class="individual">
		<view class="msg">
			<text class="msg_opt select_type">比赛类型：</text><br />
			<picker class="msg_picker msg_picker1" mode="selector" :range="selectData.comType"
				:value="selectData.comIndex" @change="comPickerChange">
				<view>
					{{selectData.comType[selectData.comIndex]}}
				</view>
				<div class="h"></div>
			</picker>
			<text class="msg_opt select_martial">武馆查询：</text><br />
			<picker class="msg_picker msg_picker2" mode="selector" :range="selectData.marArr"
				:value="selectData.marIndex" @change="marPickerChange">
				<view>
					{{selectData.marArr[selectData.marIndex]}}
				</view>
				<div class="h"></div>
			</picker>
		</view>
		<view class="race_list">
			<Race v-for="(item,index) in raceList" :key={index} :msg="{index,...item}"></Race>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onBeforeMount
	} from 'vue'
	import Race from './Race/index.vue'

	let selectData = reactive({
		// 下拉框选项
		comIndex: 0,
		comType: ['个人竞技', '团体竞技'],
		marIndex: 0,
		marArr: ['武馆1', '武馆2', '武馆3']
	});

	
	let raceList = ref([]);

	function comPickerChange(e) {
		selectData.comIndex = e.detail.value;
	};

	function marPickerChange(e) {
		selectData.marIndex = e.detail.value;
	};

	onBeforeMount(() => {
		uni.request({
			url: 'https://cqshq.top/ShowMatchPlayers?mid=9999&winner=3',
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log('ShowMatchPlayers-res',JSON.parse(res.data));
				raceList.value = JSON.parse(res.data);
			}
		});
	});
</script>

<style scoped>
	.individual {
		width: 100vw;
		height: 100vh;
	}

	.msg {
		position: relative;
		width: 750upx;
		height: 200upx;
		font-size: 37upx;
		font-weight: 400;
	}

	.msg_opt {
		position: relative;
		left: 40upx;
		font-weight: 600;
	}

	.msg_picker {
		position: absolute;
		left: 230upx;
		height: 48upx;
		border: 2upx solid black;
		font-size: 30upx;
		padding-left: 15upx;
	}

	.msg_picker1 {
		width: 200upx;
		top: 51upx;
	}

	.msg_picker2 {
		width: 400upx;
		top: 142upx;
	}

	.h {
		position: absolute;
		top: 10upx;
		right: 5upx;
		width: 0px;
		height: 0px;
		border: 10px solid transparent;
		border-top-color: black;
	}


	.select_type {
		top: 50upx;
	}

	.select_martial {
		top: 90upx;
	}

	.userName {
		font-size: 40upx;
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
		top: -2upx;
		right: 20upx;
		width: 220upx;
		height: 135upx;
		transform: scale(0.7);
		text-shadow: 2upx 10upx 8upx #2a2a2a;
	}

	.player_r .race_text {
		position: absolute;
		text-align: right;
		top: -2upx;
		right: 130upx;
		width: 220upx;
		height: 135upx;
		transform: scale(0.7);
		text-shadow: 2upx 10upx 8upx #2a2a2a;
	}

	.race_text,
	.martial {
		z-index: 2;
	}

	.player_l .martial {
		position: absolute;
		left: -20upx;
		bottom: 66upx;
		font-size: 1upx;
		transform: scale(0.76);
		text-shadow: 2upx 10upx 8upx #2a2a2a;
	}

	.player_r .martial {
		position: absolute;
		right: -20upx;
		bottom: 66upx;
		font-size: 1upx;
		transform: scale(0.76);
		text-shadow: 2upx 10upx 8upx #2a2a2a;
	}

	.user_msg {
		font-size: 1upx;
	}

	.player_l .headImg {
		position: absolute;
		left: 40upx;
		top: 47upx;
		width: 83upx;
		height: 83upx;
		border-radius: 50%;
	}

	.player_r .headImg {
		position: absolute;
		top: 47upx;
		right: 38upx;
		width: 83upx;
		height: 83upx;
		border-radius: 50%;
	}

	.player_l .res {
		position: absolute;
		top: 98upx;
		left: 95upx;
		width: 43upx;
		height: 43upx;
		border-radius: 50%;
		box-shadow: 0upx 10upx 10upx rgba(24, 24, 24, 0.5)
	}

	.player_r .res {
		position: absolute;
		top: 98upx;
		right: 95upx;
		width: 43upx;
		height: 43upx;
		border-radius: 50%;
		box-shadow: 0upx 10upx 10upx rgba(24, 24, 24, 0.5)
	}

	.detail {
		position: absolute;
		left: 345upx;
		bottom: 20upx;
		text-decoration: none;
		color: #e8e8e8;
		font-size: 22upx;
		transform: scale(0.7);
	}

	.title {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		line-height: 45upx;
		font-size: 28upx;
		z-index: 2;
	}

	.userName {
		font-size: 40upx;
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
		top: -2upx;
		right: 20upx;
		width: 220upx;
		height: 135upx;
		transform: scale(0.7);
		text-shadow: 2upx 10upx 8upx #2a2a2a;
	}

	.player_r .race_text {
		position: absolute;
		text-align: right;
		top: -2upx;
		right: 130upx;
		width: 220upx;
		height: 135upx;
		transform: scale(0.7);
		text-shadow: 2upx 10upx 8upx #2a2a2a;
	}

	.race_text,
	.martial {
		z-index: 2;
	}

	.player_l .martial {
		position: absolute;
		left: -20upx;
		bottom: 66upx;
		font-size: 1upx;
		transform: scale(0.76);
		text-shadow: 2upx 10upx 8upx #2a2a2a;
	}

	.player_r .martial {
		position: absolute;
		right: -20upx;
		bottom: 66upx;
		font-size: 1upx;
		transform: scale(0.76);
		text-shadow: 2upx 10upx 8upx #2a2a2a;
	}

	.user_msg {
		font-size: 1upx;
	}

	.player_l .headImg {
		position: absolute;
		left: 40upx;
		top: 47upx;
		width: 83upx;
		height: 83upx;
		border-radius: 50%;
	}

	.player_r .headImg {
		position: absolute;
		top: 47upx;
		right: 38upx;
		width: 83upx;
		height: 83upx;
		border-radius: 50%;
	}

	.player_l .res {
		position: absolute;
		top: 98upx;
		left: 95upx;
		width: 43upx;
		height: 43upx;
		border-radius: 50%;
		box-shadow: 0upx 10upx 10upx rgba(24, 24, 24, 0.5)
	}

	.player_r .res {
		position: absolute;
		top: 98upx;
		right: 95upx;
		width: 43upx;
		height: 43upx;
		border-radius: 50%;
		box-shadow: 0upx 10upx 10upx rgba(24, 24, 24, 0.5)
	}

	.detail {
		position: absolute;
		left: 345upx;
		bottom: 20upx;
		text-decoration: none;
		color: #e8e8e8;
		font-size: 22upx;
		transform: scale(0.7);
	}

	.title {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		line-height: 45upx;
		font-size: 28upx;
		z-index: 2;
	}
</style>
