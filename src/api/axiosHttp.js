import axios from "axios";
import config from "../config/httpConfig";
import store from ".././store";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? config.baseUrl.dev
    : config.baseUrl.pro;
console.log(baseUrl);
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: { token: null },
    };
    console.log(config.headers);
    return config;
  }
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        console.log(store.state.user.token);
        if (store.state.user.token) {
          store.commit("getToken");
          console.log(store.state.user.token);
          config.headers.token = store.state.user.token;
        }
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        console.log(response);
        // 对响应数据做点什么
        return response;
      },
      function (error) {
        console.log(error, "error");
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = { ...this.getInsideConfig(), ...options };
    this.interceptors(instance);

    return instance(options);
  }
}

export default new HttpRequest(baseUrl);
