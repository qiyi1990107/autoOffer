import axios from 'axios';
axios.defaults.timeout = 50000;
axios.defaults.baseURL = 'http://localhot:3000';


//http request 拦截器
axios.interceptors.request.use(
  function (config) {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
  },
  function (error) {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        querry: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
      })
    }
    return response;
  },
  function (error) {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (err) {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise(function (resolve, reject) {
    console.log(data)
    axios.post(url, data)
      .then(function (response) {
        resolve(response.data);
      }, function (err) {
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
  return new Promise(function (resolve, reject) {
    axios.patch(url, data)
      .then(function (response) {
        resolve(response.data);
      }, function (err) {
        reject(err)
      })
  })
}
