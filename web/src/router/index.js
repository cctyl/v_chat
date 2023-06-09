//该文件用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
import PC from "../pages/PC"
import Mobile from "../pages/Mobile"
//vue-router本身是一个插件，需要注册
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes:[
        //写一组一组的路由，每个路由都是一个配置对象
        {
            path:'/pc',
            component:PC,
        },
        {
            path: '/mobile',
            component: Mobile,
        }
    ]
})
//初始化时调用一次
//然后，在每一次切换路由之前，执行一次这个方法
//全局前置路由守卫
router.beforeEach((to, from, next) => {


    if (to.path==="/"){
        let code = to.query.code;
        if (code){
            localStorage.setItem('code',code)
            console.log("路径上code获取成功")
        }else {
            console.error(`code未获取成功,当前url=${window.location.href}`)
        }
    }

    let code = localStorage.getItem("code");
    if (!code){
        console.error("vueRouter检查 未获得code")
        next(false)
    }else {
        // const isMobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
        const isMobile = true;
        if (isMobile) {
            // 如果是手机访问，则跳转到/mobile路径
            if (to.path !== '/mobile') {
                next('/mobile')
            } else {
                next()
            }
        } else {
            // 如果是PC浏览器访问，则跳转到/pc路径
            if (to.path !== '/pc') {
                next('/pc')
            } else {
                next()
            }
        }
    }
})

//创建并暴露一个路由器
export default router
