import Vue from 'vue';
import vueRouter from 'vue-router';
import axios from 'axios';

//导入组件页面对象
import App from './App.vue';
import layout from './components/admin/layout.vue';
import login from './components/admin/account/login.vue';
import goodslist from './components/admin/goods/goodslist.vue';
import goodsadd from './components/admin/goods/goodsadd.vue';
import goodsedit from './components/admin/goods/goodsedit.vue';

//导入elementUI
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-default/index.css';
import '../statics/theme_rms/index.css';
import '../statics/css/site.css';

// 绑定到vue对象上
Vue.use(vueRouter);
Vue.use(ElementUI);


Vue.use(axios);

//设定axios的参数使得axios发出的ajax请求能够自动带上cookie路由规则
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://157.122.54.189:9095';
Vue.prototype.$http = axios;



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
                { name: 'goodsadd', path: 'goodsadd', component: goodsadd },
                { name: 'goodsedit', path: 'goodsedit/:id', component: goodsedit }
            ]
        }
    ]
});
//路由钩子函数
router.beforeEach((to, from, next) => {
        // console.log(to); //当前要进入的路由
        // console.log(from) // 代表来源路由
        // console.log(next) //要执行一下 next()方法才能正常渲染出组件页面
        if (to.name == 'login') {
            next();
        } else {
            // 检查是否登录过
            var url = '/admin/account/islogin';
            axios.get(url).then(res => {
                if (res.data.code == 'nologin') {
                    // 注意router和$router的区别
                    router.push({ name: 'login' })
                } else {
                    next()
                }
            })
        }
    })
    //实例化vue
new Vue({
    el: '#app',
    router: router,
    render: create => create(App) //传入的参数必须和导入的App根组件一致
})