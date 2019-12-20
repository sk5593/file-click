import request from './index';

export const getList = (current, size) => {
    return request({
        url: '/apis/d/stock/list',
        method: 'get',
        params: {
            current,
            size,
        },
    });
};
export const getName = (source) => {
    return request({
        url: '/apis/d/stock/name',
        method: 'post',
        headers: {'content-type': 'application/json'},
        data: source,
    });
};
export const getArea = (source) => {
    return request({
        url: '/apis/d/stock/area',
        method: 'post',
        headers: {'content-type': 'application/json'},
        data: source,
    });
};
export const search = (current, size,options) => {
    return request({
        url: '/apis/d/stock/search',
        method: 'post',
        headers: {'content-type': 'application/json'},
        data: options,
        params: {
            current, size
        }
    });
};
export const getUserInfo = (code) => {
    return request({
        url: '/apis/d/stock/userInfo',
        method: 'get',
        params: {
            code
        },
    });
};
export const clearToken = () => {
    return request({
        url: '/apis/d/stock/clearToken',
        method: 'get',
        params: {
            openId:"ou_82202c691d5c712421f780d323b39088",
            secret:"secret333"
        },
    });
};
