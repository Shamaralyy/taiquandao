import request from "@/utils/request";

export function addPlayerAPI(org_id, obj) {
    const {
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
    } = obj;
    return request({
        url: '/AddPlayer?org_id=' + org_id,
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
        }
    })
}

export function getUsersInfoAPI(org_id, obj) {
    const {
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
    } = obj;
    return request({
        url: '/GetUsersInfo?org_id=' + org_id,
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
        }
    })
}