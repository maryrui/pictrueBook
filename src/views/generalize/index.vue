<template>
    <div class="box">
        <img :src="url" alt="">
        <!--<img src="../../../static/images/qr.png" alt="">-->
        <div class="copy_box">
            <input type="text" v-model="urlVal"><button
                v-clipboard:copy="urlVal"
                v-clipboard:success="onCopy"
        >复制推广链接</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getGeneralize,getWXInfoDetail} from '@/api/user'

    export default {
        name: "index",
        data(){
            return {
                url:"",
                urlVal:'',
                wxConfig:{
                    title:"",
                    link:'http://unicorn.mobile.aiteyou.net/pictrue/#/index?sharerId='+sessionStorage.getItem('userId'),
                    desc:"",
                    imgUrl:""
                }
            }
        },
        created(){
            this.fetchData();
            this.getWXInfo();
        },
        mounted(){
            // this.urlVal="http://unicorn.mobile.aiteyou.net/test/#/?sharerId="+this.userId
            this.urlVal="http://unicorn.mobile.aiteyou.net/pictrue/#/?sharerId="+this.userId
        },
        methods:{
            fetchData(){
                getGeneralize({userId:this.userId}).then(res=>{
                    if(res.Success){
                        this.url=res.Data;
                    }
                })
            },
            getWXInfo(){
                getWXInfoDetail({
                    url:window.location.href.split('#')[0]
                }).then(res=>{
                    this.wxConfig.title=res.Data.Title
                    this.wxConfig.desc=res.Data.Content
                    this.wxConfig.imgUrl=res.Data.ImagePath
                    let _this=this;
                    wx.config({
                        // debug: true,////生产环境需要关闭debug模式
                        appId: res.Data.Appid,//appId通过微信服务号后台查看
                        timestamp: res.Data.Timestamp,//生成签名的时间戳
                        nonceStr: res.Data.Noncestr,//生成签名的随机字符串
                        signature: res.Data.Sign,//签名
                        jsApiList: [//需要调用的JS接口列表
                            'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                            'onMenuShareTimeline',//分享给好友
                            'onMenuShareAppMessage'//分享到朋友圈
                        ]
                    });

                    wx.ready(function () {
                        //分享朋友圈
                        wx.onMenuShareTimeline({
                            title: _this.wxConfig.title,
                            link: _this.wxConfig.link,
                            desc:_this.wxConfig.desc,
                            imgUrl: _this.wxConfig.imgUrl,// 自定义图标
                            trigger: function (res) {
                                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回.
                                //alert('click shared');
                            },
                            success: function (res) {
                                //alert('shared success');
                                //some thing you should do
                            },
                            cancel: function (res) {
                                //alert('shared cancle');
                            },
                            fail: function (res) {
                                //alert(JSON.stringify(res));
                            }
                        });
                        //分享给好友
                        wx.onMenuShareAppMessage({
                            title: _this.wxConfig.title,
                            link: _this.wxConfig.link,
                            desc:_this.wxConfig.desc,
                            imgUrl: _this.wxConfig.imgUrl,// 自定义图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function (res) {
                                // 用户确认分享后执行的回调函数
                                // alert(res)
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.error(function (res) {
                            alert(res.errMsg);
                        });
                    })
                })
            },
            // 复制成功
            onCopy(e){
                this.$toast('复制成功')
            },
            // 复制失败
            onError(e){
                this.$toast('复制失败')
            },
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        }
    }
</script>

<style scoped>
    .box{
        width:100%;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .box img{
        width:100%;
    }
    .copy_box{
        padding:16px;
        position:absolute;
        width:100%;
        bottom:20%;
        left:0;
        font-size:14px;
        box-sizing: border-box;
    }
    .copy_box input{
        width:50%;
        background: 0;
        padding:3px 16px;
        border:0;
        color:#1989fa;
        border-radius:0;
        border-bottom:1px solid #fff;
    }
    .copy_box button{
        display: inline-block;
        padding:5px 16px;
        background:#b92f25;
        color:#fff;
        border-radius:3px;
        border:0;
    }
</style>