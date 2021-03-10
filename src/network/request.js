import axios from "axios";

//搜索  实例
export function search(config) {
  const searchInstance = axios.create({
    baseURL: 'http://localhost:3000/search',
    timeout: 10000,
  })

 return searchInstance(config);
}

//首页获取banner
export function banner(config) {
  const bannerInstance = axios.create({
    baseURL: 'http://localhost:3000/banner',
    timeout: 10000,
  })

  return bannerInstance(config)
}

// mv页获取mv
export function mv(config) {
  const mvInstance = axios.create({
    baseURL: 'http://localhost:3000/mv/all',
    timeout: 10000,
  })

  return mvInstance(config)
}
