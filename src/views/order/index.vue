<template>
    <div class="order_box">
        <van-tabs v-model="active" swipeable animated sticky @click="tabClick" :swipe-threshold="5">
            <van-tab  title="全部 ">
                <ul class="list">
                    <li v-for="(item,index) in orderList.all" :key="index">
                        <div class="top">
                            <span>
                                {{item.CreateTime}}
                            </span>
                            <p>
                                <b>{{item.OrderState | orderState}}</b>
                                <van-icon name="delete" v-if="item.OrderState=='finish'||item.OrderState=='alreadyCancel'|| item== 'payFail'" @click="deletClick(item.OrderNumber)"></van-icon>
                            </p>
                        </div>
                        <div class="middle" @click="$router.push('/orderDetail/'+item.OrderNumber)">
                            <img :src="item ? item.ImagePath : ''" alt="">
                            <p>
                               {{item ? item.ProductName : ''}}
                            </p>
                            <div>
                                <span>{{item.TableName==4 ? '积分'+item.Integral : '￥'+item.Price}}</span> <br>
                                <b>× {{item.Count}}</b>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                <span v-show="parseInt(userId)!=parseInt(item.UserId)">{{item.NikeName}}</span><p>共{{item.Count}}件&nbsp;&nbsp;合计: <b>{{item.TotalMoney}} {{item.TableName==4 ? '(积分)' : '￥'}}</b></p>
                            </div>
                            <p v-if="item.OrderState=='finish'">
                                <!--<button @click="buyAgain">再次购买</button>-->
                                <button @click="showExpress(item.OrderShipment.LogisticCode,item.OrderShipment.ShipperCode,item.OrderNumber)" v-show="item.OrderShipment">查看物流</button>
                            </p>
                            <!--<p v-if="item.OrderState=='alreadyCancel'">
                                <button @click="buyAgain">再次购买</button>
                            </p>-->
                            <p v-if="item.OrderState=='waitPay'&& parseInt(userId)==parseInt(item.UserId)">
                                <button @click="resetAddress(item.OrderNumber)">修改地址</button>
                                <button @click="cancelOrder(item.OrderNumber,index)">取消订单</button>
                                <button @click="nowPay(index)" class="danger">立即付款</button>
                            </p>
                            <p v-if="item.OrderState=='waitHarvest'">
                                <button @click="afterService(item.OrderNumber)" v-show="parseInt(userId)==parseInt(item.UserId)">退款/售后</button>
                                <button @click="showExpress(item.OrderShipment.LogisticCode,item.OrderShipment.ShipperCode,item.OrderNumber)" v-show="item.OrderShipment">查看物流</button>
                                <button @click="receipt(item.OrderNumber,index)" class="danger" v-show="parseInt(userId)==parseInt(item.UserId)">确认收货</button>
                            </p>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab  title="待付款 ">
                <ul class="list">
                    <li v-for="(item,index) in orderList.waitPay" :key="index">
                        <div class="top">
                        <span>
                            {{item.CreateTime}}
                        </span>
                            <p>
                                <b>待付款</b>
                                <!--<van-icon name="delete"></van-icon>-->
                            </p>
                        </div>
                        <div class="middle" @click="$router.push('/orderDetail/'+item.OrderNumber)">
                            <img :src="item ? item.ImagePath : ''" alt="">
                            <p>
                                {{item ? item.ProductName : ''}}
                            </p>
                            <div>
                                <span>￥ {{item ? item.Price : 0.00}}</span> <br>
                                <b>× {{item.Count}}</b>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                <span v-show="parseInt(userId)!=parseInt(item.UserId)">{{item.NikeName}}</span><p>共{{item.Count}}件&nbsp;&nbsp;合计: <b>{{item.TotalMoney}} {{item.TableName==4 ? '(积分)' : '￥'}}</b></p>
                            </div>
                            <p v-show="parseInt(userId)==parseInt(item.UserId)">
                                <button @click="resetAddress(item.OrderNumber)">修改地址</button>
                                <button @click="cancelOrder(item.OrderNumber,index)">取消订单</button>
                                <button @click="nowPay(index)" class="danger">立即付款</button>
                            </p>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab  title="待发货 ">
                <ul class="list">
                    <li v-for="(item,index) in orderList.waitSetGoods" :key="index">
                        <div class="top">
                        <span>
                            {{item.CreateTime}}
                        </span>
                            <p>
                                <b>待发货</b>
                                <!--<van-icon name="delete"></van-icon>-->
                            </p>
                        </div>
                        <div class="middle" @click="$router.push('/orderDetail/'+item.OrderNumber)">
                            <img :src="item ? item.ImagePath : ''" alt="">
                            <p>
                                {{item ? item.ProductName : ''}}
                            </p>
                            <div>
                                <span>{{item.TableName==4 ? '积分'+item.Integral : '￥'+item.Price}}</span> <br>
                                <b>× {{item.Count}}</b>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                <span v-show="parseInt(userId)!=parseInt(item.UserId)">{{item.NikeName}}</span><p>共{{item.Count}}件&nbsp;&nbsp;合计: <b>{{item.TotalMoney}} {{item.TableName==4 ? '(积分)' : '￥'}}</b></p>
                            </div>
                            <p v-show="parseInt(userId)==parseInt(item.UserId)">
                                <button @click="resetAddress(item.OrderNumber)">修改地址</button>
                                <button @click="cancelOrder(item.OrderNumber,index)">取消订单</button>
                            </p>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab  title="待收货 ">
                <ul class="list">
                    <li v-for="(item,index) in orderList.waitHarvest" :key="index">
                        <div class="top">
                        <span>
                            {{item.CreateTime}}
                        </span>
                            <p>
                                <b>待收货</b>
                                <!--<van-icon name="delete"></van-icon>-->
                            </p>
                        </div>
                        <div class="middle" @click="$router.push('/orderDetail/'+item.OrderNumber)">
                            <img :src="item ? item.ImagePath : ''" alt="">
                            <p>
                                {{item ? item.ProductName : ''}}
                            </p>
                            <div>
                                <span>{{item.TableName==4 ? '积分'+item.Integral : '￥'+item.Price}}</span> <br>
                                <b>× {{item.Count}}</b>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                <span v-show="parseInt(userId)!=parseInt(item.UserId)">{{item.NikeName}}</span><p>共{{item.Count}}件&nbsp;&nbsp;合计: <b>{{item.TotalMoney}} {{item.TableName==4 ? '(积分)' : '￥'}}</b></p>
                            </div>
                            <p>
                                <button @click="afterService(item.OrderNumber)" v-show="parseInt(userId)==parseInt(item.UserId)">退款/售后</button>
                                <button @click="showExpress(item.OrderShipment.LogisticCode,item.OrderShipment.ShipperCode,item.OrderNumber)" v-if="item.OrderShipment">查看物流</button>
                                <button @click="receipt(item.OrderNumber,index)" class="danger" v-show="parseInt(userId)==parseInt(item.UserId)">确认收货</button>
                            </p>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab  title="已完成 ">
                <ul class="list">
                    <li v-for="(item,index) in orderList.finish" :key="index">
                        <div class="top">
                        <span>
                            {{item.CreateTime}}
                        </span>
                            <p>
                                <b>已完成</b>
                                <van-icon name="delete" @click="deletClick(item.OrderNumber)"></van-icon>
                            </p>
                        </div>
                        <div class="middle" @click="$router.push('/orderDetail/'+item.OrderNumber)">
                            <img :src="item ? item.ImagePath : ''" alt="">
                            <p>
                                {{item ? item.ProductName : ''}}
                            </p>
                            <div>
                                <span>{{item.TableName==4 ? '积分'+item.Integral : '￥'+item.Price}}</span> <br>
                                <b>× {{item.Count}}</b>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                <span v-show="parseInt(userId)!=parseInt(item.UserId)">{{item.NikeName}}</span><p>共{{item.Count}}件&nbsp;&nbsp;合计: <b>{{item.TotalMoney}} {{item.TableName==4 ? '(积分)' : '￥'}}</b></p>
                            </div>
                            <p>
                                <!--<button @click="buyAgain">再次购买</button>-->
                                <button @click="showExpress(item.OrderShipment.LogisticCode,item.OrderShipment.ShipperCode,item.OrderNumber)" v-if="item.OrderShipment">查看物流</button>
                            </p>
                        </div>
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
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
                <p>支付金额 <span>￥{{parseFloat(payDetail.price *payDetail.count,2)}}</span>元</p>
                <div>
                    <p> <b></b><span>微信支付</span></p><van-icon name="checked"></van-icon>
                </div>
                <van-button type="danger" size="large" @click="payClick">确认支付</van-button>
            </div>
        </van-popup>
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
    import {getOrderList,setOrderState,againPay} from '@/api/order'
    import {mapGetters} from 'vuex'
    export default {
        name: "order",
        data(){
            return {
                active:0,
                cancelShow:false,
                currentIndex:0,
                pagesize:20,
                total:"",
                payDetail:{
                    price:0,
                    count:1,
                    code:""
                },
                currentNum:[0,0,0,0,0],
                isFetchData:[1,1,1,1,1],
                show:false,
                currentCode:"",
                columns:['收货信息有误','商品数量或款式需要调整','有更优惠的购买方案','商品缺货','不想买了','其它原因'],
                orderList:{
                    waitSetGoods:[],
                    all:[],
                    waitPay:[],
                    waitHarvest:[],
                    finish:[],
                }
            }
        },
        created(){
            this.active=parseInt(this.$route.params.id)
            this.fetchData();
        },
        mounted(){
            window.addEventListener('scroll',this.handleScroll)
        },
        computed:{
            ...mapGetters([
                'userId'
            ]),
            orderState(){
               if(this.active===4){
                    return 5
                }else{
                    return this.active
                }
            }
        },
        methods:{
            //获取订单列表
            fetchData(){
                getOrderList({
                    userId:this.userId,
                    stateModel:this.orderState,
                    pagesize:this.pagesize,
                    pageindex:this.currentNum[this.active]
                }).then(res=>{
                    if(res.Success){
                        let data=res.Data;
                        if(data.length<1){
                            return ;
                        }
                        if(data.length < this.pagesize){ this.isFetchData[this.active]=0}
                        else{ this.currentNum[this.active]++};

                        if(this.active==0){
                           data.map(item=>{
                              this.orderList.all.push(item);
                           })
                        }else if(this.active==1){
                            data.map(item=>{
                                this.orderList.waitPay.push(item);
                            })
                        }else if(this.active==2){
                            data.map(item=>{
                                this.orderList.waitSetGoods.push(item);
                            })
                        }else if(this.active==3){
                            data.map(item=>{
                                this.orderList.waitHarvest.push(item);
                            })

                        }
                        else{
                            data.map(item=>{
                                this.orderList.finish.push(item);
                            })
                        }
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
            afterService(num){
                this.$router.push('/aftersaletype/'+num)
            },
            //取消订单
            cancelOrder(code,index){
                this.cancelShow=true;
                this.currentCode=code;
                this.currentIndex=index;
            },
            //立即付款
            nowPay(index){
                if(this.active){
                    this.payDetail.price=this.orderList.waitPay[index].Price
                    this.payDetail.count=this.orderList.waitPay[index].Count
                    this.payDetail.code=this.orderList.waitPay[index].OrderNumber
                }else{
                    this.payDetail.price=this.orderList.all[index].Price
                    this.payDetail.count=this.orderList.all[index].Count
                    this.payDetail.code=this.orderList.all[index].OrderNumber
                }
                this.show=true;
            },
            //支付
            //确认支付
            payClick(){
                againPay({orderNumber:this.payDetail.code}).then(res=>{
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
                        // alert(res.err_msg === "get_brand_wcpay_request:ok");
                        if(res.err_msg==="get_brand_wcpay_request:ok"){
                            // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            window.location.reload();
                        }else{

                            console.log(res);
                        }
                    });
            },
            //修改地址
            resetAddress(code){
                this.$router.push('/orderResetAddress/'+code)
            },
            //确认收货
            receipt(code,index){
                this.$dialog.confirm({
                    title: '确认收货',
                    message: '是否执行此操作？'
                }).then(() => {
                setOrderState({
                    userId:this.userId,
                    OrderNumber:code,
                    OrderState:"finish",
                    CancelReason:''
                }).then(res=> {
                    if (res.Success) {
                        this.cancelShow=false;
                        if(this.active){
                            this.orderList.waitHarvest.splice(index,1);
                        }else{
                            this.orderList.all[index].OrderState='finish'
                        }
                        this.$toast('操作成功');
                        this.$store.dispatch('GetUserInfo')
                    }
                })
            }).catch(() => {
                // on cancel
                });
            },
            //删除订单纪录
            deletClick(code,index){
                this.$dialog.confirm({
                    title: '标题',
                    message: '是否删除当前订单？'
                }).then(() => {
                    setOrderState({
                        userId:this.userId,
                        OrderNumber:code,
                        OrderState:"delete",
                        CancelReason:''
                    }).then(res=> {
                        if (res.Success) {
                            this.cancelShow=false;
                            if(this.active){
                                this.orderList.finish.splice(index,1);
                            }else{
                                this.orderList.all.splice(index,1);
                            }
                            // this.orderList.waitPay.splice(index,1);
                            this.$toast('删除成功');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });

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
                        if(this.active){
                            this.orderList.waitPay.splice(this.currentIndex,1);
                        }else{
                            this.orderList.all[this.currentIndex].OrderState='alreadyCancel'
                        }
                        this.$toast('操作成功');
                    }
                })
            },
            //取消订单再想想
            onCancel(){
                this.cancelShow=false;
            },
            tabClick(){
                this.fetchData()
            },
            //判断浏览器请求
            handleScroll(){
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if((scrollTop+window.innerHeight)==document.body.offsetHeight){
                    if(this.isFetchData[this.active]){
                        this.fetchData()
                    }else{
                        this.$toast('没有更多了！');
                        return false;
                    }
                }
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
        align-items: center;
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
        width:20%;
    }
    .order_box .list li .bottom{
        padding:10px 0;
        text-align: right;
    }
    .order_box .list li .bottom b{
        color:#ff5044;
    }
    .order_box .list li .bottom>div span{
        color:#999999;
        margin-left:3px;
        float:left;
    }
    .order_box .list li .bottom>div{
        padding:8px 0;
       /* display: flex;
        justify-content: space-between;*/
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
    .popup_box{
        width:100%;
        background:#fff;
    }
    .popup_box h2{
        font-size:14px;
        text-align:center;
        margin-top:25px;
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
        /*background:#FF7EA3;*/
    }
</style>