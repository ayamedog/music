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
//首页 获取推荐推荐歌单
export function recoPlaylists(config) {
  const recolistsInstance = axios.create({
    baseURL:'http://localhost:3000/personalized',
    timeout: 10000
  })
  return recolistsInstance(config)
}

// mv页获取mv
export function mv(config) {
  const mvInstance = axios.create({
    baseURL: 'http://localhost:3000/mv/all',
    timeout: 10000,
  })

  return mvInstance(config)
}

//歌单页  获取歌单 默认全部
export function playlistGet(config) {
  const GetInstance = axios.create({
    baseURL: 'http://localhost:3000/top/playlist',
    timeout: 10000,
    params: {
      limit: 24
    }
  })
  return GetInstance(config)
}
//歌单页  获取全部分类
export function playlistCatlist(config) {
  const catlistInstance = axios.create({
    baseURL: 'http://localhost:3000/playlist/catlist',
    timeout: 10000
  })
  return catlistInstance(config)
}
//歌单页  获取当前热门标签
export function playlistHot() {
  const hotInstance = axios.create({
    baseURL: 'http://localhost:3000/playlist/hot',
    timeout: 10000
  })
  return hotInstance()
}