import request from "@/utils/request";

export function judgeCodeTestAPI(id, code, mid) {
    return request({
        url: '/JudgeCodeTest',
        method: 'post',
        data: { id, code, mid }
    })
}