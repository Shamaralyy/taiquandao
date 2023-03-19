<template>
	<view>
		<!-- 顶部背景 -->
		<image class='background' src="http://39.100.78.225:8002/background.png" ></image>
		<view class="center-box">
		  <view class="nav">
		    <view class="select">
		      <text>请选择</text>
		    </view>
		  </view>
		  <view class="box">
		    <view class="f">
		      <view class="fr">
		        <view class="{{namea===true?'win':'name'}}" bindtap="funa" >XXXXX</view>
		      </view>
		    </view>
		    <view class="vs">VS</view>
		    <view class="f">
		      <view class="fl">
		        <view class="{{nameb===true?'win':'name'}}" bindtap="funb" >XXXXX</view>
		      </view>
		    </view>
		  </view>
		  <view class="sumbit-btn">
		    <button style="background-color: #26221f;font-size: 30rpx;" 
		    type="primary">确认</button>
		  </view>
		</view>
		
		<!-- 重影 -->
		<view class="shadow shadow-1"></view><view class="shadow shadow-2"></view>
		
	</view>
</template>

<script>
</script>

<style>
	page{
	  height: 100%;
	  background-color: #26221f;
	  margin: 0px;
	  padding: 0px;
	}
	.background {
	  width: 100%;
	  /* position: absolute;  */
	}
	
	.center-box{
	  background-color: white;
	  margin: -10% 30rpx 0rpx 30rpx;
	  padding: 25rpx;
	  border-radius: 15rpx;
	  -webkit-filter: drop-shadow(0 0 8rpx #26221f);
	  filter: drop-shadow(0 0 8rpx #26221f);
	}
	
	.nav{
	  display: flex;
	  text-align: center;
	  font-size: 32rpx;
	  margin-bottom: 5%;
	}
	
	.select{
	  margin: auto;
	  font-weight: bold;
	  color: #26221f;
	}
	.select text{
	  padding-bottom: 5rpx;
	  border-bottom-left-radius: 10rpx;
	  border-bottom-right-radius: 10rpx;
	  border-bottom: 5rpx solid #26221f;
	}
	
	/* 重影 */
	.shadow{
	  box-shadow: 0rpx 0rpx 10rpx 0rpx #26221f;
	  border-radius: 25rpx;
	  background-color: white;
	}
	.shadow-1{
	  height: 40rpx;
	  margin: -20rpx 50rpx 0 50rpx;
	}
	.shadow-2{
	  position: relative;
	  z-index: -888;
	  height: 50rpx;
	  margin: -30rpx 80rpx 0 80rpx;
	}
	
	.box {
	  display: flex;
	}
	
	.vs {
	  width: 20%;
	  height: 80rpx;
	  text-align: center;
	  font-size: x-large;
	  font-weight: 900;
	  color: black;
	}
	
	.f {
	  width: 40%;
	}
	.fl {
	  float: left;
	}
	.fr {
	  float: right;
	}
	
	.name {
	  height: 60rpx;
	  font-size: x-large;
	  font-weight: 700;
	  border: black solid 1px;
	  border-radius: 5px;
	  padding: 0px 10px;
	}
	
	.win {
	  height: 60rpx;
	  font-size: x-large;
	  font-weight: 700;
	  padding: 0px 10px;
	  border:red solid 2px;
	  border-radius: 5px;
	  color: red;
	}
	
	.sumbit-btn{
	  margin: 4% 0rpx 10rpx 0rpx;
	}
	
	
</style>