import request from './index';

export const submit = (data) => {
    return request({
        url: '/apis/c/v1/google/coupon/r/check',
        method: 'post',
        data: data
    })
}

export const getCaptcha = () => {
    return request({
        url: '/apis/c/v1/captcha/r/generate',
        method: 'get'
    })
}

export const verify = (data) => {
    return request({
        url: '/apis/c/v1/google/coupon/w/verify',
        method: 'post',
        data: data
    })
}

export const editVerify = () => {
    return request({
        url: '/apis/c/v1/google/coupon/w/edit',
        method: 'get'
    })
}