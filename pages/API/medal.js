import request from "@/utils/request";

export function showMatchPlayersAPI(mid, winner) {
    return request({
        url: '/ShowMatchPlayers',
        method: 'get',
        data: { mid, winner }
    })
}