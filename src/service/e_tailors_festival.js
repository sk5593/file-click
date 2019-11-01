import request from './index';
const ENV = "prod";
const ENVOBJ = {
    test: "http://api-test.yeedev.com/apis/c",
    dev: "http://api-dev.yeedev.com/apis/c",
    prod: "https://api.yeelight.com/apis/c",
    stage: "http://api-stage.yeelight.com/apis/c"
};
let URL = ENVOBJ[ENV];
// 获取当前微信登陆拼团信息 y
export const getteam = (teamId) => {
    return request({    
        url: URL + '/v1/user-coupons/jd/r/get/team',
        method: 'get',
        params: {
            teamId
        }
    })
}
// 分享签名接口
export const share = (url) => {
    return request({
        url:  URL + '/wx/r/js_api_signature',
        method: 'get',
        params: {
            url
        }
    })
}
// 加入某个京东拼团 y
export const jointeam = (teamId) => {
    return request({
        url:  URL + '/v1/user-coupons/jd/w/join/team',
        method: 'post',
        data: {
            teamId
        }
    })
}
// 跳转使用京东优惠券
export const turnToUse = () => {
    return request({
        url:  URL + '/v1/user-coupons/jd/w/use/coupon/1',
        method: 'post'
    })
}
// 打开京东优惠券 y
export const opencoupon = () => {
    return request({
        url:  URL + '/v1/user-coupons/jd/w/open/coupon',
        method: 'post'
    })
}
// 京东拆券活动截止时间 y
export const config = () => {
    return request({
        url: URL +  '/v1/user-coupons/jd/r/config',
        method: 'get'
    })
}
// 京东默认优惠券 y
export const defaultCoupon = () => {
    return request({
        url:  URL + '/v1/user-coupons/jd/r/coupon/sunshine',
        method: 'get'
    })
}
// 微信授权 y
export const autoCookie = (data) => {
    return 'https://api.yeelight.com/apis/c/apis/c/wx/r/redirect?redirect=' + data;
}