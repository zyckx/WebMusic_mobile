import {defineStore} from "pinia";
import {getMusicLyric} from '../request/api/item.js'
import {getEmailLogin} from "../request/api/home.js";

export const itemMusicStore=defineStore('itemMusicStore',{
    state:()=>{
        return {
            playlist:[{ //播放列表默认值
                al: {
                    id: 74793881,
                    name: "像鱼",
                    pic: 109951163720047380,
                    picUrl: "https://p1.music.126.net/ejEPGN6ulPSgCBXGq7dgqw==/109951163720047382.jpg",
                    pic_str: "109951163720047382"
                },
                id: 1331819951,
                name: "像鱼",
                ar:[{name: "王贰浪"}]
            }],
            playListIndex: 0, //默认下标为0,
            isbtnShow: true,
            detailShow: false,
            name: "像鱼",
            ar:[{name: "像鱼"}],
            lyricList:{},
            // lyricList:{
            //     "version": 12,
            //     "lyric": "[00:00.000] 作词 : 周有才\n[00:01.000] 作曲 : 周有才\n[00:29.342]这是一首简单的歌\n[00:36.062]没有什么独特\n[00:42.894]试着代入我的心事\n[00:47.464]它那么幼稚\n[00:51.323]像个顽皮的孩子\n[00:57.327]多么可笑的心事\n[01:03.723]只剩我还在坚持\n[01:10.206]谁能看透我的眼睛\n[01:16.972]让我能够不再失明\n[01:23.973]我要记住你的样子\n[01:30.643]像鱼记住水的拥抱\n[01:37.541]像云在天空中停靠\n[01:42.346]夜晚的来到\n[01:45.776]也不会忘了阳光的温暖\n[01:51.365]我要忘了你的样子\n[01:58.015]像鱼忘了海的味道\n[02:04.874]放下所有梦和烦恼\n[02:11.547]却放不下回忆的乞讨\n[02:47.049]多么可笑的心事\n[02:52.843]只剩我还在坚持\n[02:59.914]谁能看透我的眼睛\n[03:06.676]让我能够不再失明\n[03:13.732]记住你的样子\n[03:20.431]像鱼记住水的拥抱\n[03:27.282]像云在天空中停靠\n[03:32.143]夜晚的来到\n[03:35.460]也不会忘了阳光的温暖\n[03:40.947]我要忘了你的样子\n[03:47.839]像鱼忘了海的味道\n[03:54.708]放下所有梦和烦恼\n[04:01.539]却放不下回忆的乞讨\n[04:07.977]只剩自己就好\n"
            // },//歌词
            currentTime:0,//当前时间
            duration:0,//歌曲总时长
            isLogin:false,//判断是否登录
            isFooterMusic:true,//判断底部组件是否需要显示
            token:'',//token
            user:{}//用户信息
        }
    },
    actions:{
        updataIsbtnShow(value){
            this.isbtnShow=value
        },
        pushPlayList(value){
            this.playlist.push(value)
        },
        updataPlayList(value){
            this.playlist=value
        },
        updatePlayIndex(value){
            this.playListIndex=value
        },
        updateDetailShow(){
            this.detailShow=!this.detailShow
        },
        getLyric: async function (id) {
            let res=await getMusicLyric(id)
            this.updateLyricList(res.data.lrc)
            console.log(res)
        },
        updateLyricList(value){
            this.lyricList=value
        },
        updateCurrentTime:function(value){
            // console.log(state.currentTime);
            this.currentTime=value
        },
        updateDuration:function(value){
            this.duration=value
        },
        async getLogin(value){
            let res=await getEmailLogin(value)
            console.log(res)
            return res
        },
        updateIsLogin:function(value){
            this.isLogin=true
        },
        updateToken:function(value){
            this.token=value
            localStorage.setItem('token',this.token)
        },
        updateUser:function(value){
            this.user=value
        }
}
})

