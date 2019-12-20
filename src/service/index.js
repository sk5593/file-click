/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import {serialize} from '@/util/util'
import {getToken} from '@/util/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import {Base64} from 'js-base64';

axios.defaults.timeout = 15000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 509; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = 'true';
// NProgress Configuration
NProgress.configure({
  showSpinner: false
});
//HTTPrequest拦截
axios.interceptors.request.use(config => {
  if ((config.url.indexOf('/apis/d/') >= 0) && (config.url.indexOf('/userInfo') < 0)) {
    console.log(localStorage.getItem('stock_token'))

    config.headers.common['token'] = localStorage.getItem('stock_token') || '27db0b58a7f067726ff1be74cef10ce0'
  }
  NProgress.start() // start progress bar
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  if (getToken() && !isToken) {
    config.headers['Authorization'] = getToken();
  }
  //headers中配置serialize为true开启序列化
  if (config.method === 'post' && meta.isSerialize === true) {
    config.data = serialize(config.data);
  }
  if(config.url)
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
  //token失效或者第一次登录
  if (res.data.code == "003"){
    console.log(33333)
    window.location.replace("https://open.feishu.cn/connect/qrconnect/page/sso/?redirect_uri=http://192.168.2.206/stockFeishu.html&app_id=cli_9d7d8766e8759107");
  }
  NProgress.done();
  const status = res.status || 200
//   const statusWhiteList = website.statusWhiteList || [];
  // const message = res.data.msg || res.statusText || '未知错误';
  //如果在白名单里则自行catch逻辑处理
//   if (statusWhiteList.includes(status)) return Promise.reject(res);
  // 如果请求为非200否者默认统一处理
  if (status != 200) {
    return Promise.reject(res)
  }

  return res.data;
}, error => {
  NProgress.done();
  return Promise.reject(error);
})

export default axios;
