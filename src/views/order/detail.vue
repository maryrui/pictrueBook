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
            <img :src="detail ? detail.ImagePath : ''" alt="">
            <h3>{{detail ? detail.ProductName : ''}}</h3>
            <p>
                <b>￥{{detail.Price}}</b> <br>
                 <span>✖{{detail.Count}}</span>
            </p>
        </div>
        <div class="detail_time">
            <p>订单单号： {{detail.OrderNumber}}</p>
            <p>下单日期： {{detail.CreateTime}}</p>
            <p>发货时间： {{detail.OrderShipment ? detail.OrderShipment.CreateTime : '未发货'}}</p>
        </div>
        <div class="detail_money">
            <p><b>实付金额</b><span>￥{{detail.OrderPayRecord ? detail.OrderPayRecord.Money : '0.00'}}</span></p>
            <p><b>商品总价</b><span>￥{{detail.TotalMoney}}</span></p>
            <p><b>运费</b><span>￥0.00</span></p>
        </div>
        <div class="footer">
            <p v-if="detail.OrderState=='finish'">
                <button @click="buyAgain">再次购买</button>
                <button @click="showExpress(detail.OrderShipment.LogisticCode,detail.OrderShipment.ShipperCode,detail.OrderNumber)" v-show="detail.OrderShipment">查看物流</button>
            </p>
            <p v-if="detail.OrderState=='alreadyCancel'">
                <button @click="buyAgain">再次购买</button>
            </p>
            <p v-if="detail.OrderState=='waitPay'">
                <button @click="resetAddress">修改地址</button>
                <button @click="cancelOrder">取消订单</button>
                <button @click="nowPay" class="danger">立即付款</button>
            </p>
            <p v-if="detail.OrderState=='waitHarvest'">
                <button @click="afterService">退款/售后</button>
                <button @click="showExpress(detail.OrderShipment.LogisticCode,detail.OrderShipment.ShipperCode,detail.OrderNumber)" v-show="detail.OrderShipment">查看物流</button>
                <button @click="receipt(detail.OrderNumber)" class="danger">确认收货</button>
            </p>
        </div>
        <van-popup v-model="cancelShow"  position="bottom" :overlay="true">
            <van-picker :columns="columns" show-toolbar
                        @cancel="onCancel"
                        cancel-button-text="再想想"
                        confirm-button-text="完成"
                        @confirm="onConfirm"
            />
        </van-popup>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <div class="popup_box">
                <h2>请选择支付方式 <van-icon name="cross" @click="show=false"></van-icon></h2>
                <p>支付金额 <span>￥{{parseFloat(detail.Price *detail.Count,2)}}</span>元</p>
                <div>
                    <p> <b></b><span>微信支付</span></p><van-icon name="checked"></van-icon>
                </div>
                <van-button type="danger" size="large" @click="payClick">确认支付</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {getOrder,setOrderState,againPay} from '@/api/order'
    import {mapGetters} from 'vuex'
    export default {
        name: "detial",
        data(){
            return {
                id:0,
                detail:{},
                show:false,
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
                getOrder({
                    orderNumber:this.id
                }).then(res=>{
                    if(res.Success){
                        this.detail=res.Data;
                    }
                })
            },
            //再次购买
            buyAgain(){
                this.$router.push('/settlement')
            },
            //查看物流
            showExpress(code,num,orderNum){
                this.$router.push('/express/'+code+'/'+orderNum+'/'+num)
            },
            //售后
            afterService(){
                this.$router.push('/aftersaletype/'+this.id)
            },
            //取消订单
            cancelOrder(){
                this.cancelShow=true;
            },
            //立即付款
            nowPay(){
                this.show=true;
            },
            //修改地址
            resetAddress(){
                this.$router.push('/orderResetAddress/'+this.id)
            },
            //确认收货
            receipt(){
                this.$dialog.confirm({
                    title: '确认收货',
                    message: '是否执行此操作？'
                }).then(() => {
                    setOrderState({
                        userId:this.userId,
                        OrderNumber:this.id,
                        OrderState:"finish",
                        CancelReason:''
                    }).then(res=> {
                        if (res.Success) {
                            this.cancelShow=false;
                            this.detail.OrderState='finish'
                            this.$toast('操作成功');
                        }
                    })
                }).catch(err=>{

                })
            },
            //取消订单确认
            onConfirm(item){
                setOrderState({
                    userId:this.userId,
                    OrderNumber:this.currentCode,
                    OrderState:"alreadyCancel",
                    CancelReason:item
                }).then(res=> {
                    if (res.Success) {
                        this.cancelShow=false;
                        this.detail.OrderState='alreadyCancel'
                        this.$toast('操作成功');
                    }
                })
            },
            //取消订单再想想
            onCancel(){
                this.cancelShow=false;
            },
            //支付
            //确认支付
            payClick(){
                againPay({orderNumber:this.id}).then(res=>{
                    if(res.Success){
                        if (typeof WeixinJSBridge == "undefined"){
                            if( document.addEventListener ){
                                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady.bind(null,res.Data), false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady.bind(null,res.Data));
                            }
                        }else{
                            this.onBridgeReady(res.Data);
                        }
                    }
                })
            },
            onBridgeReady(data){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId":data.appid,     //公众号名称，由商户传入
                        "timeStamp":data.timestamp,         //时间戳，自1970年以来的秒数
                        "nonceStr":data.noncestr, //随机串
                        "package":data.package,
                        "signType":"MD5",         //微信签名方式：
                        "paySign":data.sign //微信签名
                    },
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok" ){
                            // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            history.go(-1)
                        }
                    });
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
        align-items: center;
    }
    .detail_goods img{
        width:64px;
        height:64px;
        /*border:1px solid #ddd;*/
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
        width:100px;
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
    .popup_box{
        width:100%;
        background:#fff;
    }
    .popup_box h2{
        text-align:center;
        margin-top:25px;
        font-size:14px;
    }
    .popup_box h2 i{
        float:right;
        margin-right:5px;
        border-radius:50%;
        border:1px solid #ddd;
        background:#CDCDCD;
        color:#fff;
    }
    .popup_box>p{
        padding-left:16px;
        height:55px;
        line-height:55px;
        border-bottom:1px solid #E7E7E7;
        font-size:14px;
    }
    .popup_box>p span{
        color:#ff5044;
    }
    .popup_box>div{
        display: flex;
        justify-content: space-between;
        padding:15px 16px;
        font-size:14px;
        margin-bottom:147px;
    }
    .popup_box>div span{
        vertical-align: top;
        line-height:34px;
        margin-left:15px;
    }
    .popup_box>div b {
        display: inline-block;
        width:34px;
        height:34px;
        background: url('../../../static/images/wechatPay.png') no-repeat;
        background-size:100%;
        align-items: center;
    }
    .popup_box>div i{
        font-size:24px;
        line-height:34px;
        /*background:#ff5044;*/
    }
</style>