<template>
  <div class="infoUserTop">
    <img :src="userinfo.data.profile.avatarUrl" alt="" class="profileimg" />
    <div class="name">{{ userinfo.data.profile.nickname }}</div>
  </div>
</template>
<script setup>
import {itemMusicStore} from "../stores/ItemMusicStore.js";
import {computed} from "vue";
const store= itemMusicStore();
let userinfo=computed(()=>{
  if (localStorage.getItem('user')){
    return JSON.parse(localStorage.getItem('user'));
  }
  return store.user;
})

</script>
<style lang="scss" scoped>
.infoUserTop {
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .profileimg {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .name{
    font-weight: 700;
    font-size: .4rem;
  }
}
</style>
