import axios from "axios";

let BASE_URL = 'http://localhost:3000';
axios.defaults.withCredentials=true
// let BASE_URL = 'http://fbmio.com:3000';
// let BASE_URL = 'https://nicemusic-api.lxhcool.cn/';
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://localhost:3000'
// } else if (process.env.NODE_ENV === 'production') {
//   BASE_URL = 'https://10.0.4.3:3000'
// }
export const request = createBaseInstance();
//通用的axios的实例
function createBaseInstance() {
   const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
  });
   //请求拦截
  instance.interceptors.request.use(
    config => {
      if (config.method == 'post') {
        config.data = {
          ...config.data,
          timestamp: Date.parse(new Date()) / 1000
        }
      } else if (config.method == 'get') {
        config.params = {
          timestamp: Date.parse(new Date()) / 1000,
          ...config.params
        }
      }
      return config
    }, function (error) {
      return Promise.reject(error)
    }
  )
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   //必须要返回去 否则会执行catch
  //   return config
  // },err => {
  //   console.log(err);
  // })
  return instance
}
