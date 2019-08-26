<template>
    <down-order :isPay="true" @payClick="payClick" ></down-order>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getAddressList} from "../../api/user";
    import {submitOrder} from "../../api/order";
    import downOrder from '@/components/downOrder'
    export default {
        name: "settlement",
        data(){
            return {

            }
        },

        created(){

        },
        mounted(){

        },
        components:{
            downOrder
        },
        methods:{
            //确认支付
            payClick(data){
                submitOrder(data).then(res=>{
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
                var _this=this;
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
                            _this.$router.push('/order/0')
                        }
                    });
            }
        }

    }
</script>

<style scoped>

</style>