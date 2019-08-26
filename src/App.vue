<template>
<div id="app">
    <transition name="van-slide-left">
        <router-view/>
    </transition>

    <van-tabbar v-model="active" v-show="$route.meta.showTab">
        <van-tabbar-item @click="$router.push('/index')">
              <span>首页</span>
              <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.active ? user_icon.active : user_icon.normal"
              >
        </van-tabbar-item>
        <van-tabbar-item @click="$router.push('/pictrue')">
            <span>积分商城</span>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? pictrue_icon.active : pictrue_icon.normal"

            >
          </van-tabbar-item>
        <van-tabbar-item @click="$router.push('/user')">
            <span>我的</span>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? home_icon.active : home_icon.normal"
            >
        </van-tabbar-item>
    </van-tabbar>
</div>
</template>
<script>
export default {
    name: 'App',
    data(){
        return {
            user_icon: {
                normal: '../static/images/home.png',
                active: '../static/images/home_active.png'
            },
            home_icon:{
                normal: '../static/images/user.png',
                active: '../static/images/user_active.png'
            },
            pictrue_icon:{
                normal: '../static/images/pictrue.png',
                active: '../static/images/pictrue_active.png'
            },
            active:this.$route.path=='/user' ?  1 : 0
        }
    },
}
</script>

<style>
    #app{
        background:#fff;
    }
</style>
