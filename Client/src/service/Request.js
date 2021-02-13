import axios from "axios";

<<<<<<< HEAD
axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "http://8.129.235.98:2333"
    : "http://localhost:2333";
=======
axios.defaults.baseURL = "http://8.129.235.98:2333";
>>>>>>> c291bc0c863cda1424eda8b6b79a270375b3e416

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;
