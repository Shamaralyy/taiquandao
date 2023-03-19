'use strict';  
 
module.exports = {
	async getOpenid(event) {
		console.log('openidFn-event',event);
		let js_code = event;
		const appid = 'wx594c6611cf0005c5' //appid  
		const secret = '67055ee8290a6eab7b2e757439e512e6' //secret  
		const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session'   
		let res = await uniCloud.httpclient.request(loginUrl, {  
		  data: {  
		    appid: appid,  
		    secret: secret,  
		    js_code: js_code,  
		    grant_type: 'authorization_code'  
		  },  
		  dataType: 'json'  
		  })  
		console.log('openidFn-res',res);
		let openid = res.openid  //用户openid
		return res.data.openid;
	}
};