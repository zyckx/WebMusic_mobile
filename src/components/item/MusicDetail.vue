<template>
  <img :src="props.musicList.al.picUrl" alt="" class="bgimg">
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true" @click="isLyricShow=false;musicStore.updateDetailShow()">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div>
        <p>{{ props.musicList.name }}</p>
        <span v-for="(item) in props.musicList.ar" :key="item">{{ item.name }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>

  </div>
  <div v-show="!isLyricShow" class="detailContent">
    <img src="../../assets/needle-ab.png" alt="" class="img_needle"
         :class="{ img_needle_active: !isbtnShow }">
    <img src="../../assets/disc_default.png" alt="" class="img_cd"
         >
    <img :src="props.musicList.al.picUrl" alt="" class="img_ar"
         :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
    @click="isLyricShow=true">
    >
  </div>
  <div class="musicLyric" ref="musicLyricContent" v-show="isLyricShow" @click="isLyricShow=false">
<!--在这个区间的歌词就会高亮-->
    <p v-for="item in lyric" :key="item" :class="{
        active:musicStore.currentTime * 1000 >= item.time && musicStore.currentTime * 1000 < item.pre,
      }">
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="musicStore.duration" step="0.05" v-model="musicStore.currentTime">
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
          class="icon bofang"
          aria-hidden="true"
          v-if="isbtnShow"
          @click="props.play"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="props.play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
import {itemMusicStore} from "../../stores/ItemMusicStore.js";
import {watch, computed, ref, onMounted} from "vue";
let isLyricShow = ref(false);
const musicLyricContent=ref(null)
const musicStore = itemMusicStore()
const props = defineProps({
  musicList: Object,
  play: Function,
  isbtnShow: Boolean,
  addDuration: Function,
})
onMounted(() => {
  props.addDuration()
})
function goPlay(num) {
  let index = musicStore.playListIndex + num;
  if (index < 0) {
    index = musicStore.playlist.length - 1;
  } else if (index > musicStore.playlist.length - 1) {
    index = 0;
  }
  musicStore.updatePlayIndex(index);
}
const lyric=computed(()=>{
  let arr;
  if (musicStore.lyricList.lyric) {
    arr = musicStore.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
      let min = item.slice(1, 3);
      let sec = item.slice(4, 6);
      let mill = item.slice(7, 10);
      let lrc = item.slice(11, item.length);
      let time =
          parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
      if (isNaN(Number(mill))) {
        mill = item.slice(7, 9);
        lrc = item.slice(10, item.length);
        time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
      }
      // console.log(min,sec,Number(mill),lrc);
      return { min, sec, mill, lrc, time };
    });
    arr.forEach((item, i) => {
      if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
        item.pre = 100000;
      } else {
        item.pre = arr[i + 1].time;
      }
    });
  }
  console.log(arr);
  return arr;
})
watch(
    ()=>musicStore.currentTime,(newVal,oldVal)=>{
  let p=document.querySelector('p.active')
  console.log(p.offsetTop)
      if (p) {
        if (p.offsetTop > 300) {
          musicLyricContent.value.scrollTop = p.offsetTop - 300
        }
      }
      if (newVal===musicStore.duration){
        if (musicStore.playListIndex>=musicStore.playlist.length-1){
          musicStore.updatePlayIndex(0)
          props.play()
        }else {
          musicStore.updatePlayIndex(musicStore.playListIndex+1)
        }
      }
})
</script>

<style scoped lang="scss">
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}

.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;

  .detailTopLeft {
    display: flex;
    align-items: center;

    span {
      color: #000;
    }

    .icon {
      width: 0.4rem;
      height: 0.4rem;
      fill: #313131;
    }
  }
}

.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }

  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }

  .img_ar_active {
    animation-play-state: running;
  }

  .img_ar_pauesd {
    animation-play-state: paused;
  }

  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}

.musicLyric {
  width: 100%;
  height: 11rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;

  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
  }

  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}

.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }

    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }

  .range {
    width: 100%;
    height: 0.06rem;
  }

  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      fill: rgb(245, 234, 234);
    }

    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
