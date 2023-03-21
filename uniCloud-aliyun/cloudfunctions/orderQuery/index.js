'use strict';
const unipay = require('uni-pay')
const unipayIns = unipay.initWeixin({

	appId: 'wx594c6611cf0005c5', //小程序appid

	mchId: '1580643391', //微信商户号

	key: 'cBStp60k4DE9iqH72H7fUk1cmiT4tUIj'

	//pfx: fs.readFileSync('/path/to/your/pfxfile'), // p12文件路径，使用微信退款时需要，需要注意的是阿里云目前不支持以相对路径读取文件，请使用绝对路径的形式

})
exports.main = async function (event) {
  let res = await unipayIns.orderQuery({
    outTradeNo: 'outTradeNo',
  })
  return res
}
