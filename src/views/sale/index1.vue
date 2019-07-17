<template>
    <div class="order_box">
        <van-tabs v-model="active" swipeable animated  sticky>
            <van-tab  title="全部 ">
                <ul class="list">
                    <li v-for="(item,index) in orderList.all" :key="item.OrderNumber">
                        <div class="top">
                            <span>
                                订单号：{{item.OrderNumber}}
                            </span>
                            <p>
                                <b>{{item.OrderState | orderState}}</b>
                            </p>
                        </div>
                        <div class="middle" @click="$router.push('/saleDetail/'+item.OrderNumber)">
                            <img :src="item.Product.ImagePath" alt="">
                            <p>
                                {{item.Product.Name}}
                            </p>
                            <div>
                                <span>￥ {{item.Product.Price}}</span> <br>
                                <b>× {{item.Count}}</b>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                {{item.CreateTime.split(' ')[0]}}
                            </div>
                            <div>
                                共{{item.Count}}件&nbsp;&nbsp;合计: <b>￥{{item.TotalMoney}}</b>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab  title="待付款 ">
                <ul class="list">
                    <li v-for="(item,index) in orderList.waitPay" :key="index1">
                        <div class="top">
                        <span>
                            {{item.CreateTime}}
                        </span>
                            <p>
                                <b>待付款</b>
                                <!--<van-icon name="delete"></van-icon>-->
                            </p>
                        </div>
                        <div class="middle" @click="$router.push('/saleDetail/'+item.OrderNumber)">
                            <img :src="item.Product.ImagePath" alt="">
                            <p>
                                {{item.Product.Name}}
                            </p>
                            <div>
                                <span>￥ {{item.Product.Price}}</span> <br>
                                <b>× {{item.Count}}</b>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                {{item.CreateTime.split(' ')[0]}}
                            </div>
                            <div>
                                共{{item.Count}}件&nbsp;&nbsp;合计: <b>￥{{item.TotalMoney}}</b>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab  title="待收货 ">
                <ul class="list">
                    <li v-for="(item,index) in orderList.waitHarvest" :key="index1">
                        <div class="top">
                        <span>
                            {{item.CreateTime}}
                        </span>
                            <p>
                                <b>待收货</b>
                                <!--<van-icon name="delete"></van-icon>-->
                            </p>
                        </div>
                        <div class="middle" @click="$router.push('/saleDetail/'+item.OrderNumber)">
                            <img :src="item.Product.ImagePath" alt="">
                            <p>
                                {{item.Product.Name}}
                            </p>
                            <div>
                                <span>￥ {{item.Product.Price}}</span> <br>
                                <b>× {{item.Count}}</b>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                {{item.CreateTime.split(' ')[0]}}
                            </div>
                            <div>
                                共{{item.Count}}件&nbsp;&nbsp;合计: <b>￥{{item.TotalMoney}}</b>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab  title="已完成 ">
                <ul class="list">
                    <li v-for="(item,index) in orderList.waitHarvest" :key="index1">
                        <div class="top">
                        <span>
                            {{item.CreateTime}}
                        </span>
                            <p>
                                <b>已完成</b>
                                <van-icon name="delete" @click="deletClick(item.OrderNumber)"></van-icon>
                            </p>
                        </div>
                        <div class="middle" @click="$router.push('/saleDetail/'+item.OrderNumber)">
                            <img :src="item.Product.ImagePath" alt="">
                            <p>
                                {{item.Product.Name}}
                            </p>
                            <div>
                                <span>￥ {{item.Product.Price}}</span> <br>
                                <b>× {{item.Count}}</b>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                {{item.CreateTime.split(' ')[0]}}
                            </div>
                            <div>
                                共{{item.Count}}件&nbsp;&nbsp;合计: <b>￥{{item.TotalMoney}}</b>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    /* 1 待付款
    *  2 已付款
    *  3 待收货
    *  4 已取消
    *  5 已完成
    *  6 支付失败
    *  7 售后中
    *  8 删除
    * */
    import {getSaleList} from '@/api/order'
    import {mapGetters} from 'vuex'
    export default {
        name: "order",
        data(){
            return {
                active:0,
                orderList:{
                    all:[],
                    waitPay:[],
                    waitHarvest:[],
                    finish:[],
                }
            }
        },
        created(){
            this.fetchData();
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        methods:{
            //获取订单列表
            fetchData(){
                getSaleList({userId:this.userId}).then(res=>{
                    if(res.Success){
                        let data=res.Data;
                        this.orderList.all=data;
                        for(let i=0;i<data.length;i++){
                            if(data[i].OrderState=='waitPay'){
                                this.orderList.waitPay.push(data[i])
                            }
                            else if(data[i].OrderState=='waitHarvest'){
                                this.orderList.waitHarvest.push(data[i])
                            }
                            else if(data[i].OrderState=='finish'){
                                this.orderList.finish.push(data[i])
                            }
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .order_box{

    }
    .order_box .list{
        background:#F3F4F6;
        border-top:1px solid transparent;
    }
    .order_box .list li{
        background: #fff;
        padding:0  16px;
        font-size:14px;
        margin-top:8px;
        border-bottom:8px solid #F3F4F6;
    }
    .order_box .list li .top{
        display: flex;
        justify-content: space-between;
        height:42px;
        border-bottom:1px solid #E7E7E7;
        align-items: center;
    }
    .order_box .list li .top b{
        color:#ff5044;
        padding-right:5px;
    }
    .order_box .list li .top  i{
        padding-left:5px;
        display: inline-block;
        vertical-align: middle;
        border-left:1px solid #ddd;
    }
    .order_box .list li .middle{
        display: flex;
        padding:10px 0;
        border-bottom:1px solid #E7E7E7;
    }
    .order_box .list li .middle img{
        width:72px;
        height:72px;
    }
    .order_box .list li .middle>p{
        width:63%;
        margin-left:10px;
    }
    .order_box .list li .middle>div{
        text-align: right;
        width:15%;
    }
    .order_box .list li .bottom{
        padding:10px 0;
        text-align: right;
        display: flex;
        justify-content: space-between;
    }
    .order_box .list li .bottom b{
        color:#ff5044;
    }
    .order_box .list li .bottom>div span{
        color:#999999;
        margin-left:3px;
    }
    .order_box .list li .bottom>div{
        padding:8px 0;
    }
    .order_box .list li .bottom button{
        height:25px;
        text-align:center;
        border:1px solid #A6A6A6;
        background:#fff;
        border-radius:3px;
        font-size:12px;
        margin-left:20px;
    }
    .order_box .list li .bottom button.danger{
        background:#ff5044;
        color:#fff;
        border-color:#ff5044;
    }
    .order_box .list li .bottom button.enter{
        background:#ff5044;
        color:#fff;
        border:0;
    }
</style>