<template>
    <div class="detail">
        <div class="detail_status">
            <van-icon name="orders-o"></van-icon>{{detail.OrderState == 'afterSale' ? '售后中' : '待审核'}}
            <p>您的购买的物品正在{{detail.OrderState == 'afterSale' ? '售后中' : '待审核'}}</p>
        </div>
        <div class="detail_address">
            <h3><van-icon name="location-o"></van-icon>{{detail.Receiver}} {{detail.Phone}}</h3>
            <p>{{detail.Address}}</p>
        </div>
        <div class="detail_goods">
            <img :src="detail.ImagePath" alt="">
            <h3>{{detail.Name}}</h3>
            <p>
                <b>￥{{detail.Money}}</b> <br>
                <span>✖{{detail.Count}}</span>
            </p>
        </div>
        <div class="detail_time">
            <p>订单单号： {{detail.OrderNumber}}</p>
            <p>申请时间： {{detail.CreateTime}}</p>
        </div>
        <div class="detail_reason">
            <p><b>退/换货原因：</b><span>{{detail.Reason}}</span></p>
            <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问题描述：</b><span>{{detail.Description}}</span></p>
            <ul>
                <li v-for="(item,index) in detail.QuestionImagePath" :key="index">
                    <img :src="item" alt="">
                </li>
            </ul>
        </div>
        <div class="express_box" v-if="detail.AfterSaleShipment">
            <p><b>快递公司：</b><span>{{detail.AfterSaleShipment.ExpressCompany}}</span></p>
            <p><b>快递单号：</b><span>{{detail.AfterSaleShipment.LogisticCode}}</span></p>
        </div>
        <div class="detail_money">
            <p><b>实付金额</b><span>￥{{detail.Money}}</span></p>
            <p><b>商品总价</b><span>￥{{detail.Money}}</span></p>
            <p><b>运费</b><span>￥0.00</span></p>
        </div>
        <div class="footer">
            <p >
                <button @click="cancelAfter">取消售后</button>
                <button @click="fillExpress(detail.OrderNumber)" v-if="!detail.AfterSaleShipment">填写物流</button>
                <button @click="enterSuccess" class="danger">确认完成</button>
            </p>
        </div>
    </div>
</template>

<script>
    import {getAfterDetail,setOrderState} from '@/api/order'
    import {mapGetters} from 'vuex'
    export default {
        name: "detial",
        data(){
            return {
                id:0,
                detail:{},
                cancelShow:false,
                columns:['收货信息有误','商品数量或款式需要调整','有更优惠的购买方案','商品缺货','不想买了','其它原因'],
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
                getAfterDetail({
                    orderNumber:this.id,
                    userId:this.userId
                }).then(res=>{
                    if(res.Success){
                        this.detail=res.Data;
                    }
                })
            },
            //确认完成
            enterSuccess(){
                this. $dialog.confirm({
                    title: '确认完成',
                    message: '是否确认执行该操作，确认完成后订单不能重复申请售后？'
                }).then(() => {
                    setOrderState({
                        userId:this.userId,
                        OrderNumber:this.detail.OrderNumber,
                        OrderState:"waitHarvest",
                        CancelReason:''
                    }).then(res=> {
                        if (res.Success) {
                            this.cancelShow=false;
                            this.$router.go(-1)
                            this.$toast('操作成功');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            //取消售后
            cancelAfter(){
                this. $dialog.confirm({
                    title: '取消售后',
                    message: '是否确认取消售后，一个订单只能申请一次售后，售后取消后，不可再次申请售后？'
                }).then(() => {
                    setOrderState({
                        userId:this.userId,
                        OrderNumber:this.detail.OrderNumber,
                        OrderState:"waitHarvest",
                        CancelReason:''
                    }).then(res=> {
                        if (res.Success) {
                            this.cancelShow=false;
                            this.$router.go(-1)
                            this.$toast('操作成功');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            //去填写物流单号
            fillExpress(code){
                this.$router.push('/afterExpress/'+code)
            }
        }
    }
</script>

<style scoped>
    .detail{
        /*position: fixed;*/
        /*top:0;*/
        /*left:0;*/
        width:100%;
        /*height:100%;*/
        padding-bottom:50px;
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
    .detail_reason{
        margin-top:8px;
        background:#fff;
        padding:16px;
        line-height:25px;
    }

    .detail_reason ul{
        display: flex;
        margin-top:15px;
    }
    .detail_reason li{
        width:80px;
        height:80px;
        border:1px solid #ddd;
        margin-right:15px;
    }
    .detail_reason li img{
        width:100%;
        height:100%;
    }
    .express_box{
        margin-top:8px;
        background:#fff;
        padding:16px;
        line-height:25px;
    }
    .footer .danger{
        background:#ff5044;
        color:#fff;
        border-color:#ff5044;
    }
</style>