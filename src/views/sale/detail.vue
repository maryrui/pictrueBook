<template>
    <div class="detail">
        <div class="detail_status">
            <van-icon name="orders-o"></van-icon>{{detail.OrderState | orderState}}
            <p>您的购买的物品{{detail.OrderState | orderState}}，{{detail.OrderState | stateTip}}</p>
        </div>
        <div class="detail_address">
            <h3><van-icon name="location-o"></van-icon>{{detail.Name}} {{detail.Phone}}</h3>
            <p>{{detail.Address}}</p>
        </div>
        <div class="detail_goods">
            <img :src="detail.Product ? detail.Product.ImagePath : ''" alt="">
            <h3>{{detail.Product ? detail.Product.Name : ''}}</h3>
            <p>
                <b>￥{{detail.Product.Price}}</b> <br>
                <span>✖{{detail.Count}}</span>
            </p>
        </div>
        <div class="detail_time">
            <p>订单单号： {{detail.OrderNumber}}</p>
            <p>下单日期： {{detail.CreateTime}}</p>
            <p>发货时间： {{detail.OrderPayRecord ? detail.OrderPayRecord.CreateTime : '未发货'}}</p>
        </div>
        <div class="detail_money">
            <p><b>实付金额</b><span>￥{{detail.OrderPayRecord ? detail.OrderPayRecord.Money : '0.00'}}</span></p>
            <p><b>商品总价</b><span>￥{{detail.TotalMoney}}</span></p>
            <p><b>运费</b><span>￥0.00</span></p>
        </div>
    </div>
</template>

<script>
    import {getOrder,setOrderState} from '@/api/order'
    import {mapGetters} from 'vuex'
    export default {
        name: "detial",
        data(){
            return {
                id:0,
                detail:{},
            }
        },
        created(){
            this.id=this.$route.params.id;
            this.fetchData();
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        methods:{
            fetchData(){
                getOrder({
                    orderNumber:this.id
                }).then(res=>{
                    if(res.Success){
                        this.detail=res.Data;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .detail{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#F3F4F6;
        font-size:14px;
    }
    .detail_status{
        height:98px;
        background:#626775;
        font-size:16px;
        color:#fff;
        padding:16px;
        box-sizing: border-box;
    }
    .detail_status i{
        margin-right:10px;
    }
    .detail_status p{
        font-size:12px;
        line-height:45px;
        padding-left:20px;
    }
    .detail_address{
        padding:16px;
        background:#fff;
        margin-top:8px;
    }
    .detail_address h3{
        line-height:45px;
    }
    .detail_address i{
        margin-right:10px;
    }
    .detail_address p{
        padding-left:20px;
    }
    .detail_goods{
        background:#fff;
        margin-top:8px;
        padding:16px;
        display: flex;
        justify-content: space-between;
    }
    .detail_goods img{
        width:64px;
        height:64px;
        border:1px solid #ddd;
    }
    .detail_goods h3{
        width:50%;
    }
    .detail_goods>p{
        width:15%;
        text-align:right;
    }
    .detail_time{
        margin-top:8px;
        padding:16px;
        line-height:30px;
        background:#fff;
        font-weight:700;
    }
    .detail_money{
        margin-top:8px;
        background:#fff;
        padding:16px;
    }
    .detail_money>p{
        display: flex;
        justify-content: space-between;
        line-height:28px;
    }
    .detail_money b{
        font-weight:500;
        color:#999;
    }
    .detail_money>p:first-child b{
        font-weight:700;
        color:#333;
    }
    .detail_money>p:first-child span{
        color:#ff5044;
        font-weight:700;
    }
    .footer{
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
        height:50px;
        background:#fff;
        text-align:right;
    }
    .footer button{
        display: inline-block;
        width:93px;
        height:34px;
        border-radius:17px;
        text-align:center;
        background:#fff;
        border:1px solid #ccc;
        margin-right:16px;
        margin-top:8px;
        color:#999;
        cursor:pointer;
    }
    .footer .danger{
        background:#ff5044;
        color:#fff;
        border-color:#ff5044;
    }
</style>