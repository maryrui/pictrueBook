<template>
    <div class="home">
        <div class="hom_top">
            <div class="user_pic" @click="$router.push('/self')">
                <p><img :src="userInfo ? userInfo.ImagePath : ''" alt=""></p>
                <h2>{{userInfo ? userInfo.Name : ''}}</h2>
                <van-icon name="arrow" />
            </div>
            <div class="user_detail">
                <div @click="$router.push('/check/'+userInfo.Income)">
                    <h3>{{userInfo ? userInfo.Income.toFixed(2) : ''}}</h3>
                    <span>收益</span>
                </div>
                <div @click="$router.push('/sale')">
                    <h3>{{userInfo ? userInfo.SellCount: 0}} <i>笔</i></h3>
                    <span>销售明细</span>
                </div>
            </div>
        </div>
        <div class="home_content">
            <div class="content_head">
                <b>我的订单</b>
                <p @click="$router.push('/order/'+0)">全部订单 <van-icon name="arrow"></van-icon></p>
            </div>
            <div class="content_icon">
                <div @click="$router.push('/order/'+1)">
                    <p>
                        <img src="../../../static/images/payment.png" alt="">
                    </p>
                    <span>待付款</span>
                </div>
                <div @click="$router.push('/order/'+2)">
                    <p>
                        <img src="../../../static/images/putGoods.png" alt="">
                    </p>
                    <span>待收货</span>
                </div>
                <div @click="$router.push('/order/'+3)">
                    <p>
                        <img src="../../../static/images/finish.png" alt="">
                    </p>
                    <span>完成</span>
                </div>
                <div @click="$router.push('/afterSale')">
                    <p>
                        <img src="../../../static/images/afterSale.png" alt="">
                    </p>
                    <span>退换/售后</span>
                </div>
            </div>
            <ul class="">
                <li @click="$router.push('/service')">
                    <span>联系客服</span>
                    <van-icon name="arrow"></van-icon>
                </li>
                <li @click="$router.push('/address/0')">
                    <span>收货地址</span>
                    <van-icon name="arrow"></van-icon>
                </li>
                <li @click="$router.push('/generalize')" v-if="userInfo ? userInfo.IsAgent : ''">
                    <span>推广二维码</span>
                    <van-icon name="arrow"></van-icon>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getUserInfo} from '@/api/user'
    import {mapGetters} from 'vuex'
    export default {
        name: "index",
        data(){
            return {
                userInfo:null
            }
        },
        created(){
            this.getUserDetail();
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        methods:{
            getUserDetail(){
                getUserInfo({userId:this.userId}).then(res=>{
                    if(res.Success){
                        this.userInfo=res.Data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .home{
        background:#F3F4F6
    }
    .hom_top{
        height:200px;
        padding: 0 20px;
        background:#FF7EA3;
        box-sizing: border-box;
        color:#fff;
        border:1px solid #ff7ea3;
    }
    .user_pic{
        margin-top:25px;
        display: flex;
        justify-content: space-around;
        align-items:center;
    }
    .user_pic>p{
        width:20%;
        /*text-align:center;*/
    }
    .user_pic i{
        font-size:20px;
    }
    .user_pic>h2{
        width:50%;
    }
    .user_pic img{
        width:64px;
        height:64px;
        border:1px solid #ddd;
        border-radius:50%;
        overflow:hidden;
    }
    .user_pic h2{
        font-size:23px;
    }
    .user_detail{
        margin-top:25px;
        display: flex;
        justify-content:space-between;
    }
    .user_detail h3{
        font-size:20px;
        line-height:5px;
    }
    .user_detail>div{
        text-align:center;
        width:50%;
    }
    .user_detail>div:first-child{
        border-right:1px solid rgba(255,255,255,.3);
    }
    .user_detail span{
        font-size:14px;
    }
    .user_detail i{
        font-size:10px;
        font-style: normal;
    }
    .home_content{
        background:#fff;
        padding:23px;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        position:relative;
        top:-10px;
    }
    .content_head{
        font-size:16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .content_head p{
        color:#999;
    }
    .content_head i{
        position:relative;
        top:2px;
    }
    .content_icon{
        display: flex;
        justify-content: space-around;
        font-size:12px;
        text-align:center;
        margin-top:21px;
    }
    .content_icon img{
        width:40px ;
        height:40px;
    }
    .home_content ul{
        margin-top:30px;
        padding-bottom:80px;
    }
    .home_content li{
        color:#333;
        height:52px;
        display: flex;
        justify-content: space-between;
        font-size:14px;
        border-bottom:1px solid #E7E7E7;
        align-items: center;
        font-weight:700;
    }
</style>