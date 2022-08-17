<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">发现好歌单</div>
    </div>
    <div class="musicContent">
      <van-swipe :loop="false" :width="150" class="mySwiper" :show-indicators="false">
        <van-swipe-item v-for="musicList in musicData.musicLists" :key="musicList">
          <router-link :to="{path:'/itemMusicStore',query:{id:musicList.id}}">
          <img :src="musicList.picUrl" :alt="musicList.name">
          <span class="playCount">
             <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
            {{changeCount(musicList.playCount)}}
          </span>
          <span class="name">{{musicList.name}}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup>
import {reactive, onMounted} from "vue";
import {getMusicList} from "../../request/api/home.js";

const musicData = reactive({
  musicLists: []
})
onMounted(async () => {
  let res = await getMusicList()
  musicData.musicLists = res.data.result

})

function changeCount(num){
    if(num>=100000000){
      return (num/100000000).toFixed(1)+'亿'
    }else if (num>=10000){
      return (num/10000).toFixed(1)+'万'
    }
  }

</script>

<style scoped lang="scss">
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;

  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;

    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }

    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }

  .musicContent {
    position: relative;
    width: 100%;
    height: 4.3rem;
    .mySwiper {
      height: 100%;
      img{
        width: 100%;
        height: 3rem;
      }
      .playCount{
        position: absolute;
        right: 0.4rem;
        color: #fff;
        text-align: right;
        .icon{
          width: 1em; height: 1em;
          vertical-align: -0.15em;
          fill: #fff;
          overflow: hidden;
        }
      }
    }
  }

}
</style>
