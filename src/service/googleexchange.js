import request from './index';

export const check = (data) => {
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
    let url = '';
    if(data.used && data.used == 1) {
        url = '/apis/c/v1/google/coupon/w/edit';
    } else {
        url = '/apis/c/v1/google/coupon/w/verify';
    }
    return request({
        url: url,
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