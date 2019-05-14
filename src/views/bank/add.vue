<template>
    <div>
        <div class="bank_box" v-if="isOneStep">
            <van-cell-group>
                <van-field
                        v-model="userName"
                        label="持卡人"
                        @input="inputEvent(0)"
                        placeholder="请输入持卡人姓名"
                        :error-message="userTip"
                />
                <van-field
                        v-model="bankNum"
                        label="卡号"
                        @input="inputEvent(1)"
                        placeholder="请输入卡号"
                        :error-message="bankTip"
                />
            </van-cell-group>
            <div class="button">
                <van-button type="danger" size="large" :disabled="disNextBtn" @click="nextTo">下一步</van-button>
            </div>
        </div>
        <div class="bank_box" v-else>
            <van-cell-group>
                <van-field
                        v-model="bankType"
                        label="卡类型"
                        readonly
                />
                <van-field
                        v-model="phone"
                        label="手机号"
                        @input="inputEvent(2)"
                        placeholder="请输入手机号"
                        :error-message="phoneTip"
                />
            </van-cell-group>
            <div class="button">
                <van-button type="danger" size="large" :disabled="disSubmit" @click="impowerClick">同意授权绑定</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getBankInfo,addBank} from '@/api/bank.js'
    import {mapGetters} from 'vuex'
    export default {
        name: "add",
        data(){
            return {
                isOneStep:true,
                userName:"",
                bankNum:"",
                disSubmit:true,
                disNextBtn:true,
                userTip:"",
                bankTip:"",
                phoneTip:"",
                phone:"",
                bankType:"",

            }
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        methods:{
            inputEvent(num){
                if(num==2){
                    if(!/1[0-9]{10}/.test(this.phone)){
                        this.phoneTip='手机号格式不正确';
                        this.disSubmit=true;
                    }else{
                        this.phoneTip='';
                        this.disSubmit=false;
                    }
                }else{
                    if(this.userName&&this.bankNum){
                        this.disNextBtn=false;
                    }else{
                        this.disNextBtn=true;
                    }
                    if(num==1){
                        /^[0-9]{16,19}$/g.test(this.bankNum) ? this.bankTip='' : this.bankTip='卡号格式不正确';
                    }
                }


            },
            nextTo(){
                if(!this.userName){
                    this. userTip="用户姓名不能为空";
                    return ;
                }
                if(!(/^[0-9]{16,19}$/g.test(this.bankNum))){
                    this.bankTip='卡号格式不正确';
                    return ;
                }
                getBankInfo({cardNumber:this.bankNum}).then(res=>{
                    if(res.Success){
                        this.isOneStep=false;
                        this.bankType=res.Data;
                    }else{
                        this.$toast(res.Msg.message);
                        return false;
                    }
                })
            },
            impowerClick(){
                addBank(
                    {
                        "Name": this.userName,
                        "CardNumber": this.bankNum,
                        "Phone": this.phone,
                        "UserId": this.userId
                    }
                ).then(res=>{
                    if(res.Success){
                        this.$router.go(-1);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .bank_box{
        padding-top:10px;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#F3F4F6;
    }
    .bank_box>div.button{
        padding:0 16px;
        margin-top:38px;
    }
</style>