import request from './index';

export const activityHome = () => {
    return request({
        url: 'http://test.yeelight.com/apis/c/activity/r/1',
        method: 'get',
        meta: {
            isToken: false
        }
    });
}

export const activityInfor = () => {
    return request({
        url: 'http://test.yeelight.com/apis/c/activityEnrolment/r/1',
        method: 'get',
        meta: {
            isToken: false
        }
    });
}

export const submit = (data) => {
    return request({
        url: 'http://test.yeelight.com/apis/c/activityEnrolment/w',
        method: 'post',
        meta: {
            isToken: false
        },
        headers: {'content-type': 'application/json'},
        data: data
    });
}

export const address = () => {
    return request({
        url: 'http://test.yeelight.com/apis/c/geo/r/100000/children',
        method: 'get',
        meta: {
            isToken: false
        },
    });
}