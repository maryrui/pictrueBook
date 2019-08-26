<template>
    <div class="pictrueBox">
        <div class="banner_box">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img :src="image" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="title_box">
            <van-divider>热门专区</van-divider>
            <p @click="$router.push('/pictrueList/0/0/0')">更多></p>
        </div>
        <div class="list">
            <ul>
                <li v-for="(item,index) in hotList" :key="item.Id" @click="$router.push('/pictrueDetail/'+item.Id)">
                    <img :src="item.ImagePath" alt="">
                    <p class="van-ellipsis">{{item.Name}}</p>
                    <div>
                        <p>
                            <i class="gem"></i> {{item.Integral}}  <span>原价：￥<i style="color:#ff5044;font-style: normal">{{item.Price}}</i></span>
                        </p>
                    </div>
                    <p>库存：{{item.Sku}}</p>
                    <button class="exchange" @click.stop="$router.push('/exchangeOrder/'+item.Id)">
                        立即兑换
                    </button>
                </li>
            </ul>
        </div>
       <!-- <div class="title_box">
            <van-divider>年龄专区</van-divider>
        </div>
        <div class="age_box">
            <p @click="$router.push('/pictrueList/0/0/1')">
                <i></i> <br>
                <span>0+</span>
            </p>
            <p @click="$router.push('/pictrueList/0/3/1')">
                <i></i> <br>
                <span>3+</span>
            </p>
            <p @click="$router.push('/pictrueList/0/6/1')">
                <i></i> <br>
                <span>6+</span>
            </p>
        </div>-->
        <div v-for="(items,index) in list" :key="items.Id">
            <div class="title_box">
                <van-divider>{{items.Name}}</van-divider>
                <p @click="$router.push('/pictrueList/'+items.Id+'/0/2')">更多</p>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in items.books" @click="$router.push('/pictrueDetail/'+item.Id)">
                        <img :src="item.ImagePath" alt="">
                        <p class="van-ellipsis">{{item.Name}}</p>
                        <div>
                            <p>
                                <i class="gem"></i> {{item.Integral}}  <span>原价: ￥<i style="color:#ff5044;font-style: normal">{{item.Price}}</i></span>
                            </p>
                        </div>
                        <p>库存：{{item.Sku}}</p>
                        <button class="exchange" @click="$router.push('/exchangeOrder/'+item.Id)">
                            立即兑换
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {getPictrue,getHotPictrue} from "../../api/pictrue";
    export default {
        name: "index",
        data(){
            return {
                images:[
                    'http://unicorn.mobile.aiteyou.net/pictrue/static/images/banner1.png',
                    'http://unicorn.mobile.aiteyou.net/pictrue/static/images/banner3.png',
                    'http://unicorn.mobile.aiteyou.net/pictrue/static/images/banner2.png',
                    'http://unicorn.mobile.aiteyou.net/pictrue/static/images/banner4.png'
                ],
                hotList:[],
                list:[],
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData:function(){
                getHotPictrue({
                    pageindex:1,
                    pagesize:4
                }).then(res=>{
                    if(res.Success){
                        this.hotList=res.Data.Books;
                        this.getContent();

                    }
                })
            },
            getContent:function(){
                getPictrue().then(res=>{
                    if(res.Success){
                        this.list=res.Data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .pictrueBox{
        font-size:14px;
        padding-bottom:50px;
    }
    .banner_box{
        height:150px;
    }
    .banner_box img{
        width:100%;
        height:150px;

    }
    .title_box{
        position:relative;
        margin:16px;
    }
    .title_box>div{
        width:70%;
        margin: 0 auto;
    }
    .title_box>p{
        color:#999;
        position:absolute;
        right:0;
        top:0;
    }
    .list{
        background:#f7f7f7;
        padding:16px;
    }
    .list ul{
        overflow: hidden;
    }
    .list li{
        font-size:12px;
        float:left;
        width:48%;
        background:#fff;
        box-sizing: border-box;
        border-radius:8px;
        overflow: hidden;
        margin-bottom:16px;
        /*text-align: center;*/
    }
    .list li:nth-child(2n){
        margin-left:4%;
    }

    .list li p{
        padding:0 10px;
        line-height:25px;
        vertical-align: middle;
    }
    .list li>div{
        display: flex;
        font-size:16px;
        align-items: center;
        justify-content: space-between;
    }
    .list li>div p{
        font-size:12px;
    }
    .list li>div span{
        font-size:12px;
        color:#666;
        margin-left:5px;
    }
    .list li>div i{
        color:#ff5044;
        vertical-align: middle;
        font-size:16px;
        position:relative;
        top:-2px;
        }
    .age_box i{
        display: inline-block;
        width:24px;
        height:24px;
        background: url('../../assets/age0.png') no-repeat;
        background-size:100%;
    }
    .age_box p:nth-of-type(2) i{
        background: url('../../assets/age3.png') no-repeat;
        background-size:100%;
    }
    .age_box p:nth-of-type(3) i{
        background: url('../../assets/age6.png') no-repeat;
        background-size:100%;
    }
    .exchange{
        display: inline-block;
        width:100%;
        height:40px;
        line-height:40px;
        text-align:center;
        color:#fff;
        background: #ff5044;
        border:0;
    }
    .list li img{
        box-sizing: border-box;
        padding:10px;
        width:100%;
        height:164px;
        /*border:1px solid #ddd;*/
    }
    .age_box{
        display: flex;
        justify-content: space-between;
        height:45px;
        text-align: center;
        align-items: center;
        border-top:1px solid transparent;
        padding:16px 0;
        background:#fff;
    }
    .age_box>p{
        padding:8px 0;
    }
    .age_box>p{
        height:100%;
        border:1px solid #ccc;
        width:33.3%
    }
</style>