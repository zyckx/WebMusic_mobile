<template>
<div class="FootMusic">
<div class="footerLeft" @click="itemMusic.updateDetailShow">
  <img :src="itemMusic.playlist[itemMusic.playListIndex].al.picUrl" alt="">
  <div>
    <p>{{itemMusic.playlist[itemMusic.playListIndex].name}}</p>
    <span>
      横滑可以切换上下首哦
    </span>

  </div>
</div>
  <div class="footerRight">
    <svg class="icon" aria-hidden="true" @click="playMusic" v-if="itemMusic.isbtnShow">
      <use xlink:href="#icon-bofanganniu"></use>
    </svg>
    <svg class="icon" aria-hidden="true" @click="playMusic" v-else>
      <use xlink:href="#icon-weibiaoti--"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-zu"></use>
    </svg>
  </div>
<audio ref="itemMusicSrc"  :src="`https://music.163.com/song/media/outer/url?id=${itemMusic.playlist[itemMusic.playListIndex].id}.mp3`"></audio>
  <van-popup v-model:show="itemMusic.detailShow" position="right" :style="{ height: '100%',width:'100%' }" >
    <MusicDetail :musicList="itemMusic.playlist[itemMusic.playListIndex]" :play="playMusic" :isbtnShow="itemMusic.isbtnShow" :addDuration="addDuration"/>
  </van-popup>
</div>
</template>

<script setup>
import MusicDetail from '../item/MusicDetail.vue'
import {itemMusicStore} from '../../stores/ItemMusicStore.js'
import { onMounted, onUpdated, ref, watch} from "vue";
const itemMusic= itemMusicStore()
// console.log(itemMusic.playlist)
const itemMusicSrc=ref(null)
let interval=ref(null)
onMounted(() => {
  // console.log(itemMusic.playlist)
  itemMusic.getLyric(itemMusic.playlist[itemMusic.playListIndex].id)
  updateTime()
})
onUpdated(() => {
  // console.log(itemMusic.playlist)
  itemMusic.getLyric(itemMusic.playlist[itemMusic.playListIndex].id)
  addDuration()
  })
function addDuration() {
  itemMusic.updateDuration(itemMusicSrc.value.duration)
}
function updateTime(){
    interval=setInterval(() => {
    itemMusic.updateCurrentTime(itemMusicSrc.value.currentTime)
      // console.log(itemMusicSrc.value.currentTime)
      // console.log("****")
      // console.log(itemMusic.currentTime)
  }, 50);
}
function playMusic(){
  console.log(itemMusicSrc.value.currentTime)
  if (itemMusicSrc.value.paused) {
    itemMusicSrc.value.play()
    itemMusic.updataIsbtnShow(false)
    updateTime()
    // console.log(itemMusic.playlist[itemMusic.playListIndex].id)
  }else {
    itemMusicSrc.value.pause()
    itemMusic.updataIsbtnShow(true)
    clearInterval(interval)
    interval=null
  }
}

watch(()=>[itemMusic.playListIndex,itemMusic.playlist],([currentB,preB],[currentS,preS])=>{
  // itemMusicSrc.value.src=`https://music.163.com/song/media/outer/url?id=${itemMusic.playlist[newVal].id}.mp3`
  itemMusicSrc.value.autoplay=true
  if (itemMusicSrc.value.paused) {
    itemMusicSrc.value.play()
    itemMusic.updataIsbtnShow(false)
  }
  if (itemMusic.isbtnShow) {
    itemMusicSrc.value.autoplay=true
    itemMusic.updataIsbtnShow(false)
  }
})

</script>

<style scoped lang="scss">
.FootMusic{
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top:1px solid #999;
  display: flex;
  padding: .2rem;
  justify-content: space-between;
  .footerLeft{
   width:70%;
    height:100%;
    display: flex;justify-content: space-around;
    align-items: center;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight{
    width: 20%;
    height: 100%;
    border-radius: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon{
      width: .6rem;
      height: .6rem;
    }
  }
}
</style>
