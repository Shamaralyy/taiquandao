"use strict";
function testReg(type, value) {
  let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  let _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
  let reName = /^[\u4e00-\u9fa5]{2,4}$/;
  let regPhone = /^1[3-9]\d{9}$/;
  let noTs = /^((?!\\|\/|:|\*|\?|<|>|\||'|%|@|#|&|\$|\^|&|\*).){1,8}$/;
  if (type === "name") {
    return reName.test(value);
  } else if (type === "IDcard") {
    return _IDRe18.test(value) || _IDre15.test(value);
  } else if (type === "phone") {
    return regPhone.test(value);
  } else if (type === "noTs") {
    return noTs.test(value);
  }
}
function getAge(birthday) {
  if (birthday) {
    birthday = birthday.split("-");
    let date = new Date();
    let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    let age = today.map((val, index) => {
      return val - birthday[index];
    });
    if (age[2] < 0) {
      let lastMonth = new Date(today[0], today[1], 0);
      age[1]--;
      age[2] += lastMonth.getDate();
    }
    if (age[1] < 0) {
      age[0]--;
      age[1] += 12;
    }
    return age[0];
  }
}
exports.getAge = getAge;
exports.testReg = testReg;
