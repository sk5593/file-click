import request from './index';

const ENV = "stage";
const ENVOBJ = {
    test: "http://test.yeelight.com/apis/c",
    dev: "http://api-dev.yeedev.com/apis/c",
    prod: "http://api.yeelight.com/apis/c",
    stage: "http://api-stage.yeelight.com/apis/c"
};
let URL = ENVOBJ[ENV];

export const activityHome = () => {
    return request({
        url: URL + '/activity/r/1',
        method: 'get',
        meta: {
            isToken: false
        }
    });
}

export const activityInfor = () => {
    return request({
        url: URL + '/activityEnrolment/r/1',
        method: 'get',
        meta: {
            isToken: false
        }
    });
}

export const submit = (data) => {
    return request({
        url: URL + '/activityEnrolment/w',
        method: 'post',
        meta: {
            isToken: false
        },
        headers: {'content-type': 'application/json'},
        data: data
    });
}

export const autoCookie = (data) => {
    return URL + '/wx/r/redirect?redirect=' + data;
}