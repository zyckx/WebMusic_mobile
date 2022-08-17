<script setup>
import FooterMusic from './components/item/FooterMusic.vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {itemMusicStore} from "./stores/ItemMusicStore.js";
const store= itemMusicStore();
</script>

<template>
<router-view></router-view>
  <FooterMusic class="footerMusic" v-show="store.isFooterMusic"/>
</template>

<style scoped>
.footerMusic{

}
</style>
