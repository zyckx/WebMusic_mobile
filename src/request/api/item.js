import service from "../index.js";
//获取推荐歌单
export function getMusicItemList(id){
    return service({
        method:'get',
        url:`/playlist/detail?id=${id}`
    })
}
//获取歌单歌曲
export function getMusicList(id){
    return service({
        method:'get',
        url:`/playlist/track/all?id=${id}&limit=20&offset=0`
    })
}
//获取歌词
export function getMusicLyric(id){
    return service({
        method:'get',
        url:`/lyric?id=${id}`
    })
}
