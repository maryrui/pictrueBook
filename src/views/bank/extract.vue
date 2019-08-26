<template>
    <div class="bank_box">
        <div class="select_bank" @click="selectBank">
            <label>到账银行卡</label>
            <p><img :src="bankList.length>0 ? bankList[bankIndex].ImagePath : ''" alt=""> {{bankList.length>0 ? bankList[bankIndex].BankName : ''}} ({{bankList.length>0 ? bankList[bankIndex].CardNumber.substr(bankList[bankIndex].CardNumber.length-4,bankList[bankIndex].CardNumber.length) : '暂无银行卡'}})</p>
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
            <p class="text" v-show="!moneyNum">当前可提现积分 <span style="color:#ff5044;">{{JSON.stringify(userInfo)!='{}' ? userInfo.Integral.toFixed(2) : '0.00'}}</span> <span @click="moneyNum = userInfo.Integral">全部提现</span></p>
            <p class="text" v-show="moneyNum">额外扣除￥{{Math.ceil(moneyNum*0.05)}}(税率:5%)</p>
            <van-button type="danger" size="large" :disabled="moneyNum<=0" @click="submit">银行卡提现</van-button>
            <van-popup v-model="show" position="bottom" :overlay="true">
                <van-picker :columns="columns" @change="onChange"  @cancel="show=false"  @confirm="onConfirm" show-toolbar/>
            </van-popup>
        </div>
        <van-dialog
            v-model="passShow"
            title="请输入提现密码"
            closeOnClickOverlay
            :showCancelButton="false"
            :showConfirmButton="false"
        >
            <h2 style="text-align: center;line-height:55px;font-size:24px;">￥{{userInfo.Integral >(Math.ceil(moneyNum*0.05)+parseFloat(moneyNum)) ? moneyNum : moneyNum-Math.ceil(moneyNum*0.05)}}</h2>
            <p style="text-align: center">额外扣除￥{{Math.ceil(moneyNum*0.05)}}(税率:5%)</p>
            <div style="margin:35px 0">
                <van-password-input
                        :value="pass"
                        @focus="showKeyboard = true"
                />
            </div>
        </van-dialog>
        <van-number-keyboard
                :show="showKeyboard"
                extra-key="."
                style="box-sizing: border-box"
                :z-index="100000"
                close-button-text="关闭"
                @blur="showKeyboard = false;passShow=false;"
                @input="onInput"
                @delete="onDelete"
        />
    </div>
</template>

<script>
    import {getBankList,getDepositBank} from '@/api/bank'
    import {mapGetters} from 'vuex'
    export default {
        name: "extract",
        data(){
            return {
                pass:"",
                show:false,
                moneyNum:"",
                columns:[],
                bankList:[],
                bankIndex:0,
                passShow:false,
                showKeyboard:false
            }
        },
        computed:{
            ...mapGetters([
                'userId',
                'userInfo',
                'token'
            ])
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData() {
                getBankList({userId: this.userId}).then(res => {
                    if (res.Success) {
                        if (res.Data.length < 1) {
                            this.$dialog.confirm({
                                title: '提示',
                                confirmButtonText: "前往添加",
                                message: '您没有添加银行卡，是否前往添加银行看'
                            }).then(() => {
                                // on confirm
                                this.$router.push('/bankAdd/0')
                            }).catch(() => {
                                // on cancel
                            });
                            return;
                        }
                        this.bankList = res.Data;
                        let arr = [];
                        res.Data.forEach((item) => {
                            arr.push(item.BankName+'('+item.CardNumber.substr(item.CardNumber.length-4,item.CardNumber.length)+')')
                        })
                        this.columns = arr;
                    }
                })
            },
            //银行卡改变
            onChange(picker, value, index) {

            },
            //选择银行卡
            selectBank() {
                if (this.bankList.length > 0) {
                    this.show = true;
                }
            },

            //确认选择
            onConfirm(item, index) {
                this.bankIndex = index;
                this.show = false;
            },
          /*  //验证金额
            valideMoney(){

            },*/
            //提现按钮
            submit() {
                if(!/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/.test(this.moneyNum)){
                    this.$toast('请输入正确的数字，只能最多输入两位小数');
                    return false;
                }
                if(this.moneyNum<100){
                    this.$toast('最低提现￥100');
                    return false;
                }
                if(parseFloat(this.moneyNum)>this.userInfo.Integral){
                    this.$toast('提现大于账户积分，请重新输入数值');
                    return false;
                }
                this.pass='';
                this.passShow=true;
                this.showKeyboard=true;

            },
            onInput(key) {
                this.pass = (this.pass + key).slice(0, 6);
                if(this.pass.length==6){
                    getDepositBank(
                        {
                            drawMoneyModule:1,
                            amount: this.moneyNum ,
                            userId: this.userId,
                            bankId: this.bankList[this.bankIndex].BankId,
                            Password:this.pass
                        }
                    ).then(res => {
                        if (res.Success) {
                            let data={
                                bank:this.bankList[this.bankIndex].BankName+this.bankList[this.bankIndex].CardNumber.substr(this.bankList[this.bankIndex].CardNumber.length-4,this.bankList[this.bankIndex].CardNumber.length),
                                amount:this.moneyNum
                            }
                            sessionStorage.setItem('extract',JSON.stringify(data))
                            this.$router.push('/bankSuccess')
                            this.$store.dispatch('GetUserInfo')
                        }else{
                            if(res.Msg.code==1004){
                                this.$dialog.confirm({
                                    title: '密码提示',
                                    message: res.Msg.message,
                                    confirmButtonText:"忘记密码？"
                                }).then(() => {
                                    // on confirm
                                    this.$router.push('/findPass')
                                }).catch(() => {
                                    // on cancel
                                });
                            }
                        }
                    })
                }
            },
            onDelete() {
                this.pass = this.pass.slice(0, this.pass.length - 1);
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
        color:#ff5044;
    }
    .van-dialog{
        top:25%;
    }
</style>