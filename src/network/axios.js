import axios from "axios";

let BASE_URL = 'http://localhost:3000';
// let BASE_URL = 'http://1.15.157.163:3000';
// let BASE_URL = 'https://nicemusic-api.lxhcool.cn/';
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://localhost:3000'
// } else if (process.env.NODE_ENV === 'production') {
//   BASE_URL = 'https://10.0.4.3:3000'
// }

export const request = createBaseInstance();
//通用的axios的实例
function createBaseInstance() {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
  });
}
