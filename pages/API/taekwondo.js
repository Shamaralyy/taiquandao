import request from "@/utils/request";

export function sendGamesInfoAPI(id, type) {
    return request({
        url: '/SendGamesInfo',
        method: 'get',
        dara: { id, type }
    })
}