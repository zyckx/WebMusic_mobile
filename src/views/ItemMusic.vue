<template>
<!--  <Suspense>-->

  <ItemMusicTop :playlist="state.playlist"/>
<!--  <template #fallback>-->
<!--    loading-->
<!--  </template>-->
<!--    </Suspense>-->
  <ItemMusicList :item_lists="state.itemlists" :subscribedCount="state.playlist.subscribedCount"/>

</template>


<script setup>
import {onMounted, reactive} from "vue";
import {useRoute} from 'vue-router'
import {getMusicItemList, getMusicList} from "../request/api/item.js";
import ItemMusicTop from '../components/item/ItemMusicTop.vue'
import ItemMusicList from '../components/item/ItemMusicList.vue'

const state = reactive({
  playlist: {},
  itemlists: []//歌单歌曲
})
onMounted(async () => {
  let id = useRoute().query.id
  let res = await getMusicItemList(id)
  state.playlist = res.data.playlist
  // console.log(state.playlist)
  let result = await getMusicList(id)
// console.log(res.data.playlist)
// console.log(result.data.songs)
  state.itemlists = result.data.songs
  console.log(state.playlist)
//防止页面刷新
  localStorage.setItem('itemDetail', JSON.stringify(state.playlist))
  console.log(sessionStorage.getItem('itemDetail'))
})


</script>

<style scoped>

</style>
