import axios from "axios";
import {request} from "@/network/axios";

//搜索
export const search = config => request.get('/search',config)
//获取热搜关键字
export const hotSearch = () => request.get('/search/hot/detail')

//首页获取banner
export const banner = config => request.get('/banner',config)



//首页 获取推荐推荐歌单
export const recoPlaylists = config => request.get('/personalized',config)
//首页 获取推荐mv
export const recoMv = config => request.get('/personalized/mv',config)


// mv页获取mv
export const mv = config => request.get('/mv/all',config)
//mv  获取mv播放地址
export const mvUrl = config => request.get('/mv/url',config)
//mv  获取mv数据
export const mvInfo = config => request.get('/mv/detail',config)
//mv 获取相关mv
export const mvRelated = config => request.get('/simi/mv',config)
//mv 获取mv热门评论
export const mvHot = config => request.get('/comment/hot',config)
//mv 获取mv最新评论
export const mvAll = config => request.get('/comment/mv',config)
//获取上传用户详情
export const userDetail = config => request.get('/user/detail',config)

//歌单页  获取歌单 默认全部
export const playlistGet = config => request.get('/top/playlist?limit=24',config)
//歌单页  获取全部分类
export const playlistCatlist = config => request.get('/playlist/catlist',config)
//歌单页  获取当前热门标签
export const playlistHot = () => request.get('/playlist/hot')
//歌单页 获取歌单数据
export const playlistInfo = config => request.get('/playlist/detail', config);
//歌单页 获取相关歌单
export const playlistRe = id => request.get('/related/playlist',{params:{id: id}})
//歌单页 获取歌单热门评论
export const playlistAll = (id,limit) => request.get('/comment/hot',{params:{id:id,type:2,limit:limit}})
// 获取歌曲详情
export const songDetail = ids => request.get('/song/detail', {params:{ids:ids}})
//歌单页 获取歌词
export const songLyric = id =>request.get('/lyric',{params:{id: id}})

//排行榜 获取榜单
export const ranking = (config) => request.get('/toplist/detail',config)