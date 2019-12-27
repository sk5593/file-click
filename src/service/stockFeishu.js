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

// request.interceptors.request.use(config=>{
//     if (config.url.indexOf('/userInfo') >= 0)
//     {
//         return config
//     }
//     let code = getQueryVariable('code')
//     alert(code)
//     //获取到一个全新的code
//     if(code !=null&&(config.url.indexOf('/list') >= 0)){
//         //授权,更新token
//         getUserInfo(code,'cli_9d7d8766e8759107','PfjFJ4oSbjyNtQJ2OHQBucJUhZNVVece').then(res=>{
//             alert(JSON.stringify(res))
//             if (res.code==="000"){
//                 alert()
//                 localStorage.clear()
//                 localStorage.setItem("stock_token",res.data)
//                 localStorage.setItem('code',code)
//                 // this.onLoad(this.page)
//             }else{
//                 alert("登录失败")
//                 return
//             }
//         })
//     }
//     //每次请求带上token
//     return config
// })
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

