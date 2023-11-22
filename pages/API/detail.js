import request from "@/utils/request";

export function detailAPI(id) {
    return request({
        url: '/SendGamesDetails',
        method: 'get',
        data: {
            id
        }
    })
}