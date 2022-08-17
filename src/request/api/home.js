import service from "../index.js";

// 获取首页轮播
export function getBanners() {
    return service({
        method:'get',
        url:'banner?type=1'
    })
}
//获取每日歌单
export function getMusicList(){
    return service({
        method:'get',
        url:'personalized?limit=10'

    })
}
//搜索
export function searchMusic(keywords){
    return service({
        method:'get',
        url:`/cloudsearch?keywords=${keywords}`
    })
}
//登录
export function getEmailLogin(data){
    return service({
        method:'post',
        url:`/login?email=${data.email}&password=${data.password}`,
        data
    })
}
//获取用户信息
export function getUserInfo(id){
    return service({
        method:'get',
        url:`/user/detail?uid=${id}`
    })
}
