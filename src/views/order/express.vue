<template>
    <div class="express">
        <div clasS="top">
            <p>
                <img :src="express.ImagePath" alt="">
            </p>
            <div>
                <b>{{express.StateText}}</b>
                <p>
                    订单编号：{{noNum}} <br>
                    {{express.ExpressCompany ? express.ExpressCompany : '快递公司'}}：{{express.LogisticCode}}
                </p>
            </div>
        </div>
        <div class="content">
            <van-steps direction="vertical" :active="0">
                <van-step v-for="(item,index) in express.Traces" :key="index">
                    <h3>{{item.AcceptStation}}</h3>
                    <p>{{item.AcceptTime}}</p>
                </van-step>
            </van-steps>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getExpressState} from '@/api/order'
    export default {
        name: "express",
        data(){
            return {
                noNum:"",
                logisticCode:'',
                shipperCode:'',
                express:{}
            }
        },
        created(){
            this.noNum=this.$route.params.num;
            this.logisticCode=this.$route.params.id;
            this.shipperCode=this.$route.params.code;
            this.fetchData();
        },
        computed:{
            ...mapGetters([
                'goods'
            ])
        },
        methods:{
            fetchData(){
                getExpressState({
                    shipperCode:this.shipperCode,
                    logisticCode:this.logisticCode,
                    orderNumber:this.noNum
                }).then(res=>{
                    if(res.Success){
                        this.express=res.Data;
                        if(res.Data.Traces.length<1){
                            this.$toast('暂无物流信息')
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .express{
        font-size:14px;
        color:#fff;
    }
    .top{
        padding:16px;
        background:#626775;
        display:flex;
        /*justify-content: space-between;*/
    }
    .top img{
        width:100%;
        height:100%;
    }
    .top>p{
        width:72px;
        height:72px;
        margin-right:15px;
        border:1px solid #fff;
    }
    .top b{
        font-size:16px;
        margin-bottom:12px;
        display: inline-block;
    }
    .content{
        margin-top:15px;
        font-size:12px;
    }
    .content h3{
        font-weight:700;
        font-size:12px;
    }
</style>