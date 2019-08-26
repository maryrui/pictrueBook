<template>
    <div>

    </div>
</template>

<script>
    import {regUser} from '@/api/user'
    import {GetQueryString} from '@/utils/common'
    export default {
        name: "author",
        data(){
            return {
                //window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx057396c823ea22ae&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect';
            }
        },
        created() {
            let userId = sessionStorage.getItem("userId");
            //判断当前的url有没有token参数,如果不存在那就跳转到微信授权的url
            //就是前面说的ReturnGetCodeUrl方法

            if (userId==null) {
                let code = GetQueryString("code")
                if(!code){
                    let url = 'http://unicorn.mobile.aiteyou.net/pictrue/#/'+window.localStorage.getItem("beforeLoginUrl");
                    // let url = 'http://unicorn.mobile.aiteyou.net/test/#/'+window.localStorage.getItem("beforeLoginUrl");
                    url=encodeURIComponent(url)
                   window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2b6d5aab62d54ab9&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect';
                }else{
                    this.getUserId({code:code})
                }
            }
        },
        methods:{
            getUserId(data){
                regUser(data).then(res=>{
                    if(res.Success){
                        sessionStorage.setItem('userId',res.Data.UserId);
                        sessionStorage.setItem('token',res.Data.Token);
                        this.$router.push(window.sessionStorage.getItem("beforeLoginUrl"))
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>