import request from "./index";

export const getUserInfo = (code,appId,appSecret) => {
    return request({
        url: '/apis/d/feishu/userInfo',
        method: 'get',
        params: {
            code,
            appId,
            appSecret
        },
    });
};
export const clearToken = () => {
    return request({
        url: '/apis/d/feishu/clearToken',
        method: 'get',
        params: {
            openId:"ou_82202c691d5c712421f780d323b39088",
            secret:"secret333"
        },
    });
};
