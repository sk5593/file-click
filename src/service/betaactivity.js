import request from './index';

export const getCurrentOne = () => {
    return request({
        url: '/apis/c/v1/activities/r/get/current/one',
        method: 'get'
    });
}

export const checkJoinCurrentk = () => {
    return request({
        url: '/apis/c/v1/activities/r/check/join/current',
        method: 'get'
    });
}

export const submit = (data) => {
    return request({
        url: '/apis/c/v1/activities/w/applicants/join',
        method: 'post',
        headers: {'content-type': 'application/json'},
        data: data
    });
}