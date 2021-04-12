import { getToken, setToken } from "@/libs/util";
/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import bs from './base';
import qs from 'qs';
import store from '../store/index';
import router from '../router';
import vue from "../main"
// axios.defaults.withCredentials = true;
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */


// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 60
});
instance.defaults.withCredentials = true;
// 设置post请求头

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // NProgress.start();
    var token = getToken('token')
    if (config.url.substring(8, 28) === 'geoapi.heweather.net') {
      token = ''
    } else {
      if (token) {
        config.headers['Authorization'] = token;
      }
      token && (config.headers['Authorization'] = token);
    }
    if (config.url.indexOf('?') > 0) {
      config.url = config.url + '&times=' + new Date().getTime();
    } else {
      config.url = config.url + '?times=' + new Date().getTime();
    }
    return config;
  },
  error => {
    return Promise.error(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  res => {
    // NProgress.done();
    if (res.status === 200) {
      if (res.data.code == 200 || res.data.code == 10405) {
        return Promise.resolve(res.data);
      } else {
        return Promise.resolve(res.data);
      }
    } else {
      return Promise.reject(res.data);
    }
  },
  // 请求失败
  error => {
    // NProgress.done();
    if(error.message === "Network Error") {
      vue.$Message.error('网络连接失败');
      return Promise.reject(error.message)
    }
    const {
      response
    } = error;
    if (response) {
      const msg = response.data && response.data.error
      switch (response.status) {
        case 405:
          error.message = msg || '未登录'
          setToken('')
          router.push('/login')
          this.$Notice.config({
            desc: error.message
          })
          return Promise.reject(error.message)
        case 404:
          return Promise.reject("404")
        case 400:
          if(/login/.test(response.request.responseURL)){
            vue.$Modal.error({
              title: "登录态失效",
              content: "请重新登录",
              onOk() {
                setToken('')
                router.push('/login')
              },
              onCancel: () => {
                setToken('')
                router.push('/login')
              }
            });
          }
          return Promise.reject("400")
      }
    }
  }
);

export default instance;