// 引入的不再是Vue的构造函数，而是一个创建了 Vue 实例的对象
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router.js'
import store from "./store.js"
import App from './App.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建一个类似Vue实例. 如下面的 vm . 但是比 vm 更"轻"
const app = createApp(App)
// app.component
app.use(ElementPlus).use(router).use(store)
for(var o in ElementPlusIconsVue){
    app.component(o,ElementPlusIconsVue[o])

}


app.mount("#app")

/*
const vm = new Vue({
    render: h => h(App)
})
vm.$mount("#app")
*/