import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/css/global.css'
import 'lib-flexible'
import axios from 'axios';

const app = createApp(App)

installElementPlus(app,{ locale })

app.use(store).use(router).mount('#app')

app.config.globalProperties.$http = axios;
//接口请求的基准路径
// axios.defaults.baseURL = 'http://106.15.196.199/ssm-platform-master/';
axios.defaults.baseURL = 'http://localhost:8088';
// 添加请求拦截器

// axios.interceptors.request.use(config => {
//     // 在发送请求之前做些什么
//
//     // 判断是否存在token,如果存在将每个页面header添加token
//     if (sessionStorage.getItem("token")) {
//         config.headers.username = sessionStorage.getItem("username");
//         config.headers.identity = sessionStorage.getItem("identity");
//         config.headers.token = sessionStorage.getItem("token");
//     }
//
//     return config
// })


//Echarts
app.config.globalProperties.$echarts = window.echarts;

app.config.globalProperties.productionTip = false

