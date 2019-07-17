<template>
    <div class="home">
        <div class="hom_top">
            <div class="user_pic">
                <div @click="$router.push('/self')">
                    <p><img :src="userInfo ? userInfo.ImagePath : ''" alt=""></p>
                    <div>
                        <h2>{{userInfo ? userInfo.Name : ''}}</h2>
                        <span>{{userInfo ? userInfo.UserGrade : ''}}</span>
                    </div>
                </div>
                <button @click="$router.push('/bankExtract')">申请提现</button>
            </div>
            <div class="user_detail">
                <div @click="$router.push('/sale/'+userInfo.EstimateIncome )">
                    <h3>{{userInfo ? userInfo.EstimateIncome : 0}}</h3>
                    <span>预估收益</span>
                </div>
                <div>
                    <h3>{{userInfo ? userInfo.Income : ''}}</h3>
                    <span>可提现收益</span>
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
                <li @click="$router.push('/bank')">
                    <span>我的银行卡</span>
                    <van-icon name="arrow"></van-icon>
                </li>
                <li @click="$router.push('/service')">
                    <span>联系客服</span>
                    <van-icon name="arrow"></van-icon>
                </li>
                <li @click="$router.push('/address/0')">
                    <span>收货地址</span>
                    <van-icon name="arrow"></van-icon>
                </li>
                <li @click="$router.push('/team')">
                    <span>我的团队</span>
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
    import {mapGetters} from 'vuex'
    export default {
        name: "index",
        data(){
            return {
                // userInfo:null
            }
        },
        mounted(){
            // this.getUserDetail();
        },
        computed:{
            ...mapGetters([
                'userId',
                'token',
                'userInfo'
            ])
        },
        methods:{

        }
    }
</script>

<style scoped>
    .home{
        background:#f2f3f5;
    }
    .hom_top{
        height:200px;
        padding: 0 20px;
        background:#ff5044;
        box-sizing: border-box;
        color:#fff;
        border:1px solid #ff5044;
    }
    .user_pic{
        margin-top:25px;
        display: flex;
        font-size:12px;
        justify-content: space-between;
        align-items:center;
    }
    .user_pic button{
        display: inline-block;
        padding:3px 8px;
        background: 0;
        color:#fff;
        border:1px solid #fff;
    }
    .user_pic>div{
        display: flex;
    }
    .user_pic>div>div{
        margin-left:16px;
    }
    .user_pic>p{
        width:20%;
        /*text-align:center;*/
    }
    .user_pic i{
        font-size:20px;
    }
    .user_pic>div{
        width:65%;
        font-size:16px;
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
        box-shadow: 0px 0px 40px #600b06;
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