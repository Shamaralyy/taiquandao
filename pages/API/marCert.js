import request from "@/utils/request";

export function getOrgsInfoAPI({
    id,
    name,
    address,
    user_id,
    contactsName,
    contactsTel,
    contactsIdCard,
    info,
    yyzz_pic,
    filename_yyzz,
    sfzUp_pic,
    filename_sfzUp,
    sfzDown_pic,
    filename_sfzDown,
    icon,
    filename_icon
}) {
    return request({
        url: '/GetOrgsInfo',
        method: 'post',
        data: {
            id,
            name,
            address,
            user_id,
            contactsName,
            contactsTel,
            contactsIdCard,
            info,
            yyzz_pic,
            filename_yyzz,
            sfzUp_pic,
            filename_sfzUp,
            sfzDown_pic,
            filename_sfzDown,
            icon,
            filename_icon
        }
    })
}