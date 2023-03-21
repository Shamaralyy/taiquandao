'use strict';

const unipay = require('uni-pay')

const unipayIns = unipay.initWeixin({

	appId: 'wx594c6611cf0005c5', //小程序appid

	mchId: '1580643391', //微信商户号

	key: 'cBStp60k4DE9iqH72H7fUk1cmiT4tUIj'

	//pfx: fs.readFileSync('/path/to/your/pfxfile'), // p12文件路径，使用微信退款时需要，需要注意的是阿里云目前不支持以相对路径读取文件，请使用绝对路径的形式

})

exports.main = async (event, context) => {
	//event为客户端上传的参数
	let orderInfo = await unipayIns.getOrderInfo({
		openid: event.openid, //这个是客户端上传的用户的openid
		subject: event.name, // 订单名称微信支付时不可填写此项
		body: '跆拳道报名费',
		outTradeNo: event.suiji, //给他个随机号让他可以第二次发起支付  商户订单号
		totalFee: event.pric, // 金额，单位元,在上传过来的时候就已经*100了
		notifyUrl: 'https://xxxx.net/PayResult', // 支付结果通知地址
		attach: event.out_trade, //备注,订单号或 长者id 在下一步通知中判断长度来确定
	})
	return {
		orderInfo
	}
};
