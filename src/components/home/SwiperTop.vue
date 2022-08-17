<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in state.images" :key="image">
      <img :src="image.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import {reactive,onMounted} from "vue";
import {getBanners} from "../../request/api/home.js";

const state=reactive({
  images:[]
})
onMounted(async ()=>{
  let res=await getBanners()
  state.images=res.data.banners
})
</script>

<style lang="scss">
.van-swipe{
  width: 100%;
  height: 3rem;
    .van-swipe-item{
      padding: 0 0.2rem;
      img{
        width: 100%;
        height: 3rem;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active{
      background-color: rgb(219,130,130);
    }

}
</style>
