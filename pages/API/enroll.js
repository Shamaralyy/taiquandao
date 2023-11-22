import request from "@/utils/request";

export function selectGameAPI(type, mid, obj) {
    return request({
        url: '/SelectGame?type=' + type + '&mid=' + mid,
        method: 'post',
        data: { type, mid, obj }
    })
}

export function wechatPayCallbackAPI({
    age,
    sex,
    id,
    name,
    birthdate,
    organization,
    idCardNumber,
    joinInGold,
    pic,
    base64code1,
    gd,
    amount,
    pay_id,
    weChat_pay_id,
}) {
    return request({
        url: '/WechatPayCallback?type=' + type + '&mid=' + mid,
        method: 'post',
        data: {
            age,
            sex,
            id,
            name,
            birthdate,
            organization,
            idCardNumber,
            joinInGold,
            pic,
            base64code1,
            gd,
            amount,
            pay_id,
            weChat_pay_id,
        }
    })
}