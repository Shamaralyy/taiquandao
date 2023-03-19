//生成guid
const S4 = function() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
export function guid() {
	return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
};


//表单校验
export function testReg(type, value) {
	let _IDRe18 =
		/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
	let _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
	let reName = /^[\u4e00-\u9fa5]{2,4}$/;
	let regPhone = /^1[3-9]\d{9}$/;
	let noTs = /^((?!\\|\/|:|\*|\?|<|>|\||'|%|@|#|&|\$|\^|&|\*).){1,8}$/;//不包含特殊字符
	if (type === 'name') {
		return reName.test(value);
	} else if (type === 'IDcard') {
		return (_IDRe18.test(value) || _IDre15.test(value));
	} else if (type === 'phone') {
		return regPhone.test(value);
	} else if (type === 'noTs') {
		return noTs.test(value);
	}
};

//得到年龄
export function getAge(birthday) { //根据日期算年龄
	if (birthday) {
		birthday = birthday.split('-');
		// 新建日期对象
		let date = new Date();
		// 今天日期，数组，同 birthday
		let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
		// 分别计算年月日差值
		let age = today.map((val, index) => {
			return val - birthday[index]
		})
		// 当天数为负数时，月减 1，天数加上月总天数
		if (age[2] < 0) {
			// 简单获取上个月总天数的方法，不会错
			let lastMonth = new Date(today[0], today[1], 0)
			age[1]--
			age[2] += lastMonth.getDate()
		}
		// 当月数为负数时，年减 1，月数加上 12
		if (age[1] < 0) {
			age[0]--
			age[1] += 12
		}
		/* console.log(age[0]+'岁'+age[1]+'月'+age[2]+'天'); */
		return age[0];
	}
}
