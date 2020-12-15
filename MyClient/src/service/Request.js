// 请求的时候，如果有token，将token添加到请求头
// 响应的时候，如果有token，将token保存到本地
// 响应的时候，如果没有token，或者token已过期，从本地的localstorage中删除token

import axios from "axios";
import limitLocalStorage from "../utils/limitLocalStorage.js";

const myStorage = new limitLocalStorage();

export default () => {
  axios.defaults.baseURL = "http://localhost:4399";
  let instance = axios; // 保存一下axios先
  /* if (token) {
    instance = axios.create({
      headers: {
        authorization: "bearer " + token
      }
    });
  } */

  /**
   * 获取几天
   * @param {Number} many 几天
   */
  function getDays(many) {
    return many * 1000 * 60 * 60 * 24;
  }

  // 设置拦截器
  instance.interceptors.request.use(
    config => {
      let token = myStorage.getItem("token");
      if (token) {
        config.headers.authorization = "bearer " + token; // 这里bearer后面记得+空格...
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    response => {
      if (response.headers.authorization) {
        myStorage.setItem({
          name: "token",
          value: response.headers.authorization,
          expires: getDays(1) // 几天过期，这里先设置1天
        });
        // localStorage.setItem("token", response.headers.authorization);
      }
      return response;
    },
    error => {
      //token不存在或者过期
      if (error.response.status === 403) {
        console.log("token过期或者不存在，这边先将你本地token删除");
        localStorage.removeItem("token");
        return Promise.reject(error);
      }
    }
  );
  return instance;

};
