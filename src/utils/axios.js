import Axios from 'axios'
import Vue from 'vue'

// http request 请求拦截器，有token值则配置上token值
const axios = Axios.create({
  baseURL: 'http://localhost:9999'
});
axios.interceptors.request.use(
  config => {
    if (localStorage.token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清k除token的代码
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response)
  });

export function login (params) {
  return new Promise((resolve, reject) => {
    axios.post('/dsp-admin/user/login', params)
    .then(res => {
      resolve(res)
    })
  })
}

export function upCreative (params) {
  return new Promise((resolve, reject) => {
    axios.post('/dsp-creative/creative/up', params)
    .then(res => {
      console.log(16543)
      resolve(res)
    })
  })
}

Object.defineProperty(Vue.prototype, '$axios', {
  value: axios
})
