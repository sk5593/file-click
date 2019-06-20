import request from './index';

export const changeCaptcha = (teamId) => {
    return request({
        url: '/apis/c/v1/user-coupons/youpin/r/get/team',
        method: 'get',
        params: {
            teamId
        }
    })
}

export const submit = (source, teamId) => {
    return request({
        url: '/apis/c/v1/user-coupons/youpin/w/join/team',
        method: 'post',
        data: {
            source,
            teamId
        }
    })
}

export const getCaptcha = () => {
    return request({
        url: '/apis/c/v1/user-coupons/youpin/w/open/coupon',
        method: 'post'
    })
}

export const config = () => {
    return request({
        url: '/apis/c/v1/user-coupons/youpin/r/config',
        method: 'get'
    })
}