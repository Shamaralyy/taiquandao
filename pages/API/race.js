import request from "@/utils/request";

export function sendOrgsInfoAPI() {
    return request({
        url: '/SendOrgsInfo',
        method: 'get',
    })
}