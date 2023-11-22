import { BASE_URL } from '@/config/index' //获取请求域名

/**
 * 创建request请求
 * @returns
 */
const request = (
    url,
    type,
    data,
    header
) => {
    let apiUrl = BASE_URL + url
    const token = uni.getStorageSync("token");
    // 全局添加请求头
    let obj = {
        'Authorization': (token || ""),
    }
    if (header) {
        // 有无传入header，有则合并
        let headers = Object.assign(header, obj);
        header = headers;
    } else {
        header = obj
    }
    if (data) {
        // 清除无用参数
        Object.keys(data).forEach(key => {
            if (data[key] == null || data[key] == undefined || data[key] === '') {
                delete (data[key]);
            }
        })
    }

    return new Promise((resolve, reject) => {
        uni.request({
            url: apiUrl,
            method: type,
            data,
            header,
            success(res) {
                if (res.statusCode == 200) {
                    resolve(data.data)
                }
            },
            fail(err) {
                console.log(err)
                uni.hideLoading();
                common.toastErr("网络请求异常")
                reject(err)
            }
        })
    })
}

export default request;