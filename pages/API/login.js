import request from "@/utils/request";

export function loginAPI(id) {
    return request({
        url: '/Login',
        method: 'get',
        data: {
            id
        }
    })
}