import Vue from 'vue';
import vueRouter from 'vue-router';
import axios from 'axios';

//导入组件页面对象
import App from './App.vue';
import layout from './components/admin/layout.vue';
import login from './components/admin/account/login.vue';
import goodslist from './components/admin/goods/goodslist.vue';
import goodsadd from './components/admin/goods/goodsadd.vue'

//导入elementUI
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-default/index.css';
import '../statics/theme_rms/index.css';
import '../statics/css/site.css';

// 绑定到vue对象上
Vue.use(vueRouter);
Vue.use(ElementUI);
Vue.use(axios);

axios.defaults.baseURL = 'http://157.122.54.189:9095';
Vue.prototype.$http = axios;

//定义路由规则
var router = new vueRouter({
        routes: [
            { name: 'default', path: '/', redirect: '/admin' }, //配置根目录的默认跳转
            { name: 'login', path: '/login', component: login },
            {
                name: 'layout',
                path: '/admin',
                component: layout,
                children: [
                    { name: 'goodslist', path: 'goodslist', component: goodslist },
                    { name: 'goodsadd', path: 'goodsadd', component: goodsadd }
                ]
            }
        ]
    })
    //实例化vue
new Vue({
    el: '#app',
    router: router,
    render: create => create(App) //传入的参数必须和导入的App根组件一致
})