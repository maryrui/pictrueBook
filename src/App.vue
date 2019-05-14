<template>
<div id="app">
    <router-view/>
    <van-tabbar v-model="active" v-show="$route.meta.showTab">
        <van-tabbar-item @click="$router.push('/index')">
              <span>首页</span>
              <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.active ? user_icon.active : user_icon.normal"
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
                normal: '../../static/images/home.png',
                active: '../../static/images/home_active.png'
            },
            home_icon:{
                normal: '../../static/images/user.png',
                active: '../../static/images/user_active.png'
            }
        }
    },
    computed:{
        active(){
            return this.$route.path=='/user' ?  1 : 0;
        }
    },
}
</script>

<style>

</style>
