<template>
 <div class="searchTop">
   <svg class="icon" aria-hidden="true" @click="router.back()">
        <use xlink:href="#icon-zuojiantou"></use>
   </svg>
   <input type="text" placeholder="陈奕迅" @keydown.enter="enterKey()" v-model="searchData.searchKeyWord">
 </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span class="spanKey" v-for="item in searchData.keyWordList" :key="item" @click="searchHistory(item)">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="deleteKey()">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in searchData.searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.ar" :key="index">{{
              item1.name
            }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if='item.mvid !==0'>
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {searchMusic} from "../request/api/home.js";
import {itemMusicStore} from "../stores/ItemMusicStore.js";
const searchStore=itemMusicStore()
const router = useRouter();
const searchData=reactive({
  keyWordList:[],
  searchKeyWord:'',
  searchList:[]
})
onMounted(()=>{
  searchData.keyWordList=JSON.parse(localStorage.getItem('keyWordList'))||[];
})
async function enterKey(){
  if (searchData.searchKeyWord!=='') {
    searchData.keyWordList.unshift(searchData.searchKeyWord)
    searchData.keyWordList=[...new Set(searchData.keyWordList)]//去重
    if (searchData.keyWordList.length>5) {
      searchData.keyWordList.pop()
    }
    localStorage.setItem('keyWordList',JSON.stringify(searchData.keyWordList))
    let res=await searchMusic(searchData.searchKeyWord)
    searchData.searchList=res.data.result.songs
    console.log(res)
    searchData.searchKeyWord=''
  }

}
async function searchHistory(item) {
  let res=await searchMusic(item)
  searchData.searchList=res.data.result.songs
  console.log(res)
}
function deleteKey(){
  localStorage.removeItem("keyWorldList");
  this.keyWorldList = [];
}
function updateIndex(item){
  searchStore.pushPlayList(item)
  searchStore.updatePlayIndex(searchStore.playlist.length-1)
}
</script>

<style scoped lang="scss">
.searchTop{
  width: 100%;
  height: 1rem;
  padding: .2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input{
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 80%;
    padding: 0.1rem;
  }
  .icon{
    width: .4rem;
    height: .4rem;
    fill: #ccc;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
.itemList {
  width: 100%;
  padding: .2rem;
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }
      div {
        p {
          width: 4.54rem;
          height: .4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }
        span{
          font-weight: 400;
          font-size: .24rem;
          color: #999;
        }
        margin-left: 0.3rem;
      }
    }
    .itemRight{
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      .icon{
        fill: #999;
      }
      .bofang{
        position: absolute;
        left: 0;
      }
      .liebiao{
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
