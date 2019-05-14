<template>
    <div class="bank_box">
        <div class="select_bank" @click="selectBank">
            <label>到账银行卡</label>
            <p><img :src="bankList ? bankList[bankIndex].ImagePath : ''" alt=""> {{bankList.length>0 ? bankList[bankIndex].BankName : ''}} ({{bankList ? bankList[bankIndex].CardNumber.substr(bankList[bankIndex].CardNumber.length-4,bankList[bankIndex].CardNumber.length) : ''}})</p>
            <!---->
            <van-icon name="arrow"></van-icon>
        </div>
        <div>
            <div class="money_box">
                <h2>提现金额</h2>
                <div>
                    <b>￥</b>
                    <input type="number" v-model="moneyNum"/>
                </div>
            </div>
            <p class="text">当前余额{{deposit.toFixed(2)}}元 ,<span @click="moneyNum=deposit">全部提现</span></p>
            <van-button type="danger" size="large" :disabled="moneyNum<=0" @click="submit">提现</van-button>
            <van-popup v-model="show" position="bottom" :overlay="true">
                <van-picker :columns="columns" @change="onChange"  @cancel="show=false"  @confirm="onConfirm" show-toolbar/>
            </van-popup>
        </div>
    </div>
</template>

<script>
    import {getBankList} from '@/api/bank'
    import {mapGetters} from 'vuex'
    export default {
        name: "extract",
        data(){
            return {
                show:false,
                moneyNum:"",
                columns:[],
                deposit:0,
                bankList:[],
                bankIndex:0,
            }
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        created(){
            this.deposit=parseInt(this.$route.params.id)
            this.fetchData();
        },
        methods:{
            fetchData(){
                getBankList({userId:this.userId}).then(res=>{
                    if(res.Success){
                        if(res.Data.length<1){
                            this.$toast('您没有添加银行卡，请先添加绑定银行卡信息');
                            return ;
                        }
                        this.bankList=res.Data;
                        let arr=[];
                        res.Data.forEach((item)=>{
                            arr.push(item.BankName)
                        })
                        this.columns=arr;
                    }
                })
            },
            //银行卡改变
            onChange(picker, value, index) {

            },
            //选择银行卡
            selectBank(){
                if(this.bankList.length>0){
                    this.show=true;
                }
            },

            //确认选择
            onConfirm(item,index){
                this.bankIndex=index;
            },
            //提现按钮
            submit(){
                this.$toast('此功能正在开发中...')
            }
        }
    }
</script>

<style scoped>
    .bank_box{
        padding:16px;
        box-sizing: border-box;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#F3F4F6;
        font-size:15px;
    }
    .bank_box>div:last-child{
        background:#fff;
        padding:0 16px 16px 16px;
        border-top:1px solid transparent;
    }
    .select_bank{
        background:#FBFBFB;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:64px;
        padding:0 16px;
        font-weight:700;
    }
    .select_bank img{
        width:16px;
        height:16px;
        border-radius:50%;
        position:relative;
        top:3px;
        margin-right:5px;
    }
    .money_box{
        padding:0 16px;
        margin-top:25px;
        font-size:15px;
    }
    .money_box h2{
        font-size:15px;
        margin-bottom:33px;
    }
    .money_box b{
        font-size:34px;
    }
    .money_box input{
        border:0;
        background:0;
        margin-left:15px;
        font-size:18px;
    }
    .money_box>div{
        padding-bottom:10px;
        border-bottom:1px solid #ddd;
    }
    .text{
        margin-top:21px;
        color:#999;
        font-size:14px;
        margin-bottom:36px;
    }
    .text span{
        color:#FF7EA3;
    }
</style>