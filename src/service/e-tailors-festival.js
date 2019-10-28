import request from './index';
// 获取当前微信登陆拼团信息
export const getteam = (teamId) => {
    return request({    
        url: '/apis/c/v1/user-coupons/jd/r/get/team',
        method: 'get',
        params: {
            teamId
        }
    })
}
// 分享签名接口
export const share = (url) => {
    return request({
        url: '/apis/c/wx/r/js_api_signature',
        method: 'get',
        params: {
            url
        }
    })
}
// 加入某个京东拼团
export const jointeam = (union_id, team_id) => {
    return request({
        url: '/apis/c/v1/user-coupons/jd/w/join/team',
        method: 'post',
        data: {
            union_id,
            team_id
        }
    })
}
// 跳转使用京东优惠券
export const turnToUse = () => {
    return request({
        url: '/apis/c/v1/user-coupons/jd/w/open/coupon',
        method: 'post'
    })
}
// 打开京东优惠券
export const opencoupon = () => {
    return request({
        url: '/apis/c/v1/user-coupons/jd/w/open/coupon',
        method: 'post'
    })
}
// 京东拆券活动截止时间
export const config = () => {
    return request({
        url: '/apis/c/v1/user-coupons/jd/r/config',
        method: 'get'
    })
}
// 京东默认优惠券
export const defaultCoupon = () => {
    return request({
        url: '/apis/c/v1/user-coupons/jd/r/coupon/sunshine',
        method: 'get'
    })
}