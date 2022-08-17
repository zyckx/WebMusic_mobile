<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
          type="email"
          name="email"
          class="email"
          v-model="loginData.email"
          placeholder="请输入手机号码"
      />
      <input
          type="password"
          name="password"
          class="password"
          v-model="loginData.password"
          placeholder="请输入密码"
      />
      <button class="btn" @click="Login()">登录</button>
    </div>
  </div>
</template>
<script setup>
import {reactive} from "vue";
import {itemMusicStore} from "../stores/ItemMusicStore.js";
import {useRouter} from "vue-router";
import {getUserInfo} from "../request/api/home.js";

const router= useRouter();
const store= itemMusicStore();
const loginData=reactive({
  email:'',
  password:''
})
async function Login(){
  let res= await store.getLogin(loginData);
  if (res.data.code===200){
    store.updateIsLogin(true);
    store.updateToken(res.data.token);
    store.user=await getUserInfo(res.data.account.id)
    localStorage.setItem('user',JSON.stringify(store.user));
    router.push('/infouser');
  }else {
    alert(res.msg);
  }
  console.log(res)
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .email,
    .password {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn{
      width: 2rem;
      height: .6rem;
    }
  }
}
</style>
