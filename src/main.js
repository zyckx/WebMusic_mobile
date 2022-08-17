import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router.js";
import getVant from "./plugins/index.js";
import pinia from "./stores/piniaStore.js";
import '../public/rem.js'
getVant(createApp(App))
createApp(App).use(pinia).use(router).mount('#app')
