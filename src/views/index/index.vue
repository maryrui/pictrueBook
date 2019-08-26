<template>
    <div class="home_box">
        <ul class="nav_bar" v-show="isScroll">
           <li><a href="#demo1">商品详情</a></li>
           <li><a href="#demo2">产品价值</a></li>
           <li><a href="#demo3"> 一家老小</a></li>
        </ul>
        <div v-html="videoHtml">

        </div>
      <!--  <div>
            <img v-for="img in imageList" v-lazy="img" >
        </div>-->
        <div v-html="content">

        </div>
        <p>
            <van-button type="danger" size="large" class="buyButton" @click="nowBuyClick">立即购买(￥{{parseFloat(goods.Price).toFixed(2)}})</van-button>
        </p>
       <!-- <p class="buyBtn" @click="nowBuyClick">
            <van-icon name="shopping-cart"></van-icon>
        </p>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "index",
        data(){
            return {
                id:1001,
                imageList:[],
                content:'',
                videoHtml:'',
                isScroll:false
            }
        },
        created(){
            this.getDetail();
        },
        mounted(){
            let _this=this;
            window.addEventListener('scroll',function(traget){
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if(scrollTop>300){
                    _this.isScroll = true
                }else{
                    _this.isScroll = false
                }
            })
        },
        computed:{
            ...mapGetters([
                'goods',
            ])
        },
        methods:{
            getDetail(){
                this.$store.dispatch('getDetail').then(res=>{
                    if(res.Success){
                        var imgReg = /<img.*?(?:>|\/>)/gi;
                        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                        var imgList=res.Data.Description.match(imgReg);
                        var videoReg=/<video.*?(?:>|\/>)/gi;
                        this.videoHtml=res.Data.Description.match(videoReg)[0];
                        this.content = res.Data.Description.replace(videoReg,'')
                        var arr=[];
                        for(let i=0;i<imgList.length;i++){
                            arr.push(imgList[i].match(srcReg)[1]);
                        }
                        this.imageList=arr;
                        this.$nextTick(() => {
                            let video=document.getElementsByTagName('video')[0];
                            if(video){
                                video.setAttribute('poster',res.Data.ImagePath)
                            }
                        })
                    }
                })
            },
            nowBuyClick(){
                localStorage.setItem('id',this.id);
                this.$router.push('/settlement');
            }
        }
    }
</script>

<style scoped>
    .home_box{
        padding:16px;
        box-sizing: border-box;
    }
    .home_box>div{
        margin-bottom:60px;
    }
    .home_box>p {
        box-sizing: border-box;
        background:#fff;
        padding:16px;
        position:fixed;
        bottom:50px;
        left:0;
        width:100%;
        height:80px;
    }
    .nav_bar{
        display: flex;
        font-size:13px;
        text-align: center;
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:45px;
        line-height:45px;
        background:rgba(255,255,255,1);
        box-shadow: 0px 10px 15px #f7f7f7;
        z-index:1000;
    }
    .nav_bar li{
        width:33.3%
    }
    .nav_bar li a{
        color:#333;
    }
</style>
<style>
    .home_box img{
        width:100%;
    }
</style>
/* <style scoped>
  .buyBtn{
       position:fixed;
        bottom:15%;
        right:10%;
        width:50px;
        height:50px;
        padding:5px;
        background:rgba(255,255,255,.5);
        border-radius:50%;
        border:1px solid #ff5044;
        color:#ff5044;
        font-size:30px;
        box-sizing: border-box;
        text-align:center;
        line-height:50px;
    }
</style>*/
