// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css';
import store from '@/store/'
import './styles/index.css'
import 'amfe-flexible'
import * as filters from '@/utils/fillters.js'
import {GetQueryString} from '@/utils/common'


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    //  第一次进入项目
    let userId = window.sessionStorage.getItem("userId");
    if(to.meta.title){
      document.title=to.meta.title;
    }
    if(to.path=='/index'&&JSON.stringify(to.query) != "{}"){
        sessionStorage.setItem("code", to.query.sharerId);
    }
    if (userId==null&& to.path != "/author") {
        // 保存用户进入的url
        if(localStorage.getItem('beforeLoginUrl')){
            next("/author");
            return false;
        }else{
            localStorage.setItem("beforeLoginUrl", to.path);
        }
    }
    if (userId) {
        console.log((store))
        store.commit('SET_USERID',userId);
        store.commit('SET_TOKEN',sessionStorage.getItem('token'));
        let data=store.getters.userInfo;
        data=JSON.stringify(data)
        console.log(data);
        if(data=='{}'){
            store.dispatch('GetUserInfo').then(()=>{
                next ();
                return false;
            });
        }
    }
        next();
});


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.use(Vant)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
