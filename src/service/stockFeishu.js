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

export const selectOutOfStockRatio =()=>{
    return request({
        url: '/apis/d/stock/selectOutOfStockRatio',
        method: 'get',
    });
}


request.interceptors.request.use(config=>{
    if ((config.url.indexOf('/apis/d/') >= 0) && (config.url.indexOf('/userInfo') < 0)) {
        config.headers.common['token'] = localStorage.getItem('stock_token') || '27db0b58a7f067726ff1be74cef10ce0'
    }
    //每次请求带上token
    return config
})
request.interceptors.response.use(res =>{
    if (res.code === "003"){
        window.location.replace("https://open.feishu.cn/connect/qrconnect/page/sso/?redirect_uri="+window.location.href+"&app_id=cli_9d7d8766e8759107");
    }
    return res;
})
//
// function getQueryVariable(variable)
// {
//     let query = window.location.search.substring(1);
//     let vars = query.split("&");
//     for (let i=0;i<vars.length;i++) {
//         let pair = vars[i].split("=");
//         if(pair[0] == variable){return pair[1];}
//     }
//     return null;
// }

