<template>
    <div class="codeBox">
        <p>验证已下发至绑定银行卡预留手机号{{phone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</p>
        <div>
            <van-password-input
                :value="value"
                :gutter="10"
                :length="4"
                :mask="false"
                @focus="showKeyboard = true"
            />
        </div>
        <p class="time"><span v-show="time">{{time}}s</span><span v-show="!time" @click="setCode">重新发送验证码？</span></p>
       <p class="btn">
           <van-button size="large" type="danger" :disabled="value.length<4" @click="submitClick">下一步</van-button>
       </p>
        <van-number-keyboard
                :show="showKeyboard"
                extra-key="."
                close-button-text="完成"
                @blur="showKeyboard = false"
                @input="onInput"
                @delete="onDelete"
        />
    </div>
</template>

<script>
    import {setCodeSms,addBank} from '@/api/bank'
    export default {
        name: "phoneCode",
        data(){
            return {
                value:"",
                showKeyboard:false,
                phone:"",
                time:0,
                timer:null,
                type:0
            }
        },
        created(){
            this.phone=this.$route.params.phone;
            this.type=this.$route.params.type;
            this.setCode()
        },
        methods:{
            onInput(key){
                this.value = (this.value + key).slice(0, 4);
            },
            onDelete(){
                this.value = this.value.slice(0, this.value.length - 1);
            },
            setSeconds(){
                this.time=60;
                this.timer=setInterval(()=>{
                    this.time--;
                    if(this.time<1){
                        clearInterval(this.timer)
                    }
                },1000)
            },
            //发送验证码
            setCode(){
                this.value=''
                setCodeSms({
                    smsType:this.type,
                    phone:this.phone
                }).then(res=>{
                    if(res.Success){
                        this.setSeconds()
                    }
                })
            },
            //提交银行卡
            submitClick(){
                let data=JSON.parse(sessionStorage.getItem('bank'));
                data.Code=this.value;
                this.$emit('btnClick',data);
            }
        },

    }
</script>

<style scoped>
    .codeBox{
        text-align:center;
        padding:16px 16px;
        background:#f7f7f7;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        box-sizing: border-box;
        font-size:14px;
    }
    .codeBox li{
        width:50px;
    }
    .codeBox>div{
        width:100%;
        margin-top:35px;
    }
    .time{
        text-align:right;
        margin-top:25px;
        color:#1989fa;
        font-weight:600;
    }
    .btn{
        margin-top:100px;
    }
</style>