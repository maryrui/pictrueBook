<template>
    <div class="settlement">
        <div class="select_address" v-if="address.length" @click="$router.push('/address/'+address[addressIndex].Id)">
            <div>
                <h2>{{address[addressIndex].Name}} &nbsp;&nbsp;&nbsp;{{address[addressIndex].Phone}}</h2>
                <p>{{address[addressIndex].AreaStr+address[addressIndex].DetailAddress}}</p>
            </div>
            <van-icon name="arrow"></van-icon>
        </div>
        <div class="select_address" v-else @click="$router.push('/addAddress')">
            <p>暂无收货地址，请点击前往新增</p>
            <van-icon name="arrow"></van-icon>
        </div>
        <div class="goods_box" v-if="isPay">
            <p>商品信息</p>
            <div>
                <img :src="goods ? goods.ImagePath : ''" alt="">
                <div>
                    <h2>{{goods ? goods.Name : ''}}</h2>
                    <span>￥{{goods ? goods.Price : ''}}</span>
                </div>
                <p>
                    <van-stepper v-model="num" :min="1"/>
                </p>
            </div>
        </div>
        <div class="goods_box" v-else>
            <p>商品信息</p>
            <div>
                <img :src="product ? product.ImagePath : ''" alt="">
                <div>
                    <h2>{{product ? product.Name : ''}}</h2>
                    <span>{{product ? product.Integral : ''}}</span>
                </div>
                <p>
                    <van-stepper v-model="num" :min="1"/>
                </p>
            </div>
        </div>
        <div class="remark_box">
            <p>备注</p>
            <textarea name="" id="" cols="30" rows="10" placeholder="请在此填写备注信息（选填）" v-model="remark"></textarea>
        </div>
        <div class="footer">
            <p>
                共 <span>{{num}}</span>件，{{isPay ? '实付金额' : '兑换积分'}}： <span v-if="isPay">￥{{parseFloat((goods ? goods.Price : 1)*num,2)}}</span><span v-else="isPay">{{parseFloat((product ? product.Integral : 1)*num,2)}}</span>
            </p>
            <button @click="submitOrder">{{isPay ? '提交订单' : '确认兑换'}}</button>
        </div>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <div class="popup_box">
                <h2>请选择支付方式 <van-icon name="cross" @click="show=false"></van-icon></h2>
                <p>支付金额 <span>￥{{parseFloat((goods ? goods.Price : 1) *num,2)}}</span>元</p>
                <div>
                    <p> <b></b><span>微信支付</span></p><van-icon name="checked"></van-icon>
                </div>
                <van-button type="danger" size="large" @click="payClick">确认支付</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import $http from 'axios'
    import {getAddressList} from "@/api/user";
    import {submitOrder} from "@/api/order";
    import {getPictrueDetail} from "@/api/pictrue";

    export default {
        name: "settlement",
        data(){
            return {
                show:false,
                num:1,
                addressIndex:localStorage.getItem('addressIndex') ? localStorage.getItem('addressIndex') : 0,
                remark:"",
                address:[],
                product:""
            }
        },
        props:{
            isPay:{
                type:Boolean,
                default:false
            }
        },
        created(){
            this.getAddresslist();
        },
        mounted(){
            if(this.isPay){
                if(!this.goods){
                    this.$store.dispatch('getDetail').then(res=>{})
                }
            }else{
                let id=this.$route.params.id;
                getPictrueDetail({
                    id:id
                }).then(res=>{
                    if(res.Success){
                        this.product=res.Data;
                    }
                })
            }
        },
        methods:{
            getAddresslist(){
                getAddressList({'userId':sessionStorage.getItem('userId')}).then(res=>{
                    if(res.Success){
                        this.address=res.Data;
                    }
                })
            },
            //提交订单
            submitOrder() {
                if (this.address.length < 1) {
                    this.$toast('请先选择地址');
                    return
                }
                if(!this.isPay){
                    let data={
                        "UserId": this.userId,
                        "ProductId": this.product.Id,
                        "Count": this.num,
                        "Address": this.address[this.addressIndex].AreaStr+this.address[this.addressIndex].DetailAddress,
                        "TotalMoney": this.product.Integral*this.num,
                        "Remark": this.remark,
                        "Name":this.address[this.addressIndex].Name,
                        "Phone":this.address[this.addressIndex].Phone,
                        "Integral": this.product.Integral
                    }
                    this.$emit('orderClick',data)
                }else{
                    this.show = true;
                }
            },
            //确认支付
            payClick(){
                let data={
                    "UserId": this.userId,
                    "ProductId":this.goodsId,
                    "Price": this.goods.Price,
                    "Count": this.num,
                    "SharerId": sessionStorage.getItem('code') ? sessionStorage.getItem('code') : 0,
                    "Address": this.address[this.addressIndex].AreaStr+this.address[this.addressIndex].DetailAddress,
                    "TotalMoney": this.goods.Price*this.num,
                    "Name":this.address[this.addressIndex].Name,
                    "Phone":this.address[this.addressIndex].Phone,
                    "PayType": "wx",
                    "Remark": this.remark,
                    'ConsumptionType':"1",
                    'TableName':"2",
                    'Integral':0,
                    'source':1,
                    'Spbill_create_ip':'119.23.43.228'
                }
                this.$emit('payClick',data)
            }
        },
        computed:{
            ...mapGetters([
                'userId',
                'goods',
                'goodsId'
            ])
        }

    }
</script>

<style scoped>
    .settlement{
        font-size:12px;
        background:#F3F4F6;
    }
    .select_address{
        height:80px;
        display: flex;
        position:relative;
        padding:0 16px;
        justify-content: space-between;
        align-items: center;
        background:#fff;
    }
    .select_address h2{
        line-height:45px;
        font-size:16px;
    }
    .select_address::before{
        position:absolute;
        content:"";
        top:0;
        left:0;
        width:100%;
        height:5px;
        background:url('../../static/images/address_border.png') no-repeat;
        background-size:100%;
    }
    .goods_box{
        background:#fff;
        margin-top:8px;
    }
    .goods_box>p{
        height:44px;
        line-height:44px;
        font-size:14px;
        font-weight:700;
        border-bottom:1px solid #ddd;
        padding:0 16px;
    }
    .goods_box>div{
        display: flex;
        justify-content: space-between;
        padding:14px 16px;
        align-items: center;
    }
    .goods_box>div>div{
        width:38%;
    }
    .goods_box>div img{
        width:80px;
        height:80px;
        border:1px solid #ddd;
    }
    .goods_box h2{
        font-size:12px;
        line-height:25px;
    }
    .goods_box>div p{
        width:30%;
    }
    .remark_box{
        background:#fff;
        margin-top:8px;
        padding:0 16px;
    }
    .remark_box>p{
        height:50px;
        line-height:50px;
        font-weight:700;
        font-size:14px;
    }
    .remark_box textarea{
        height:136px;
        width:100%;
        border:0;
        padding:13px;
        box-sizing: border-box;
        background:#F3F4F6;
    }
    .footer{
        position:fixed;
        bottom:0;
        left:0;
        background:#fff;
        width:100%;
        height:49px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top:8px solid #F3F4F6;
    }
    .footer button{
        display: inline-block;
        width:115px;
        height:100%;
        color:#fff;
        background:#ff5044;
        border:0;
        font-size:14px;
    }
    .footer>p{
        padding-left:16px;
        font-size:14px;
    }
    .footer>p  span{
        color:#ff5044;
    }
    .popup_box{
        width:100%;
        background:#fff;
    }
    .popup_box h2{
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
        background: url('../../static/images/wechatPay.png') no-repeat;
        background-size:100%;
        align-items: center;
    }
    .popup_box>div i{
        font-size:24px;
        line-height:34px;
        /*background:#FF7EA3;*/
    }
</style>