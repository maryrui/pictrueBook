<template>
    <div>
        <div class="bank_box">
            <van-cell-group>
                <van-field
                        v-model="userName"
                        label="持卡人"
                        @input="inputEvent(0)"
                        :disabled="userInfo.BankTrueName"
                        placeholder="请输入持卡人姓名"
                        :error-message="userTip"
                />
                <van-field
                        v-model="idCard"
                        label="身份证号"
                        @input="inputEvent(2)"
                        placeholder="请输入身份证号"
                        :error-message="idTip"
                />
                <van-field
                        v-model="bankNum"
                        label="银行卡号"
                        @input="inputEvent(1)"
                        :placeholder="num ? '尾数('+num+')' : '请输入卡号'"
                        :error-message="bankNumTip"
                />
                <van-field
                        v-model="bankName"
                        v-if="isAdd"
                        label="开户银行"
                        @click="show=true"
                        placeholder="请输入开户银行"
                        readonly
                        :error-message="bankNameTip"
                />
                <van-field
                        v-model="phone"
                        label="预留手机"
                        @input="inputEvent(3)"
                        placeholder="请输入预留手机"
                        :error-message="phoneTip"
                />
            </van-cell-group>
            <p class="radioBox" v-if="isAdd"><van-checkbox v-model="checked">同意 <span>《用户协议》</span></van-checkbox></p>
            <div class="button">
                <van-button type="danger" size="large" :disabled="disSubmit" @click="nextTo">下一步</van-button>
            </div>
        </div>
        <van-popup v-model="show" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="show=false"
                @confirm="bankConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "validtBank",
        data(){
            return {
                userName: '' ,
                idCard:"",
                bankName:"",
                bankNum:"",
                disSubmit:true,
                // disNextBtn:true,
                userTip:"",
                bankTip:"",
                phoneTip:"",
                bankNumTip:"",
                idTip:"",
                bankNameTip:"",
                phone:"",
                bankType:"",
                checked:false,
                show:false,
                columns:['农业银行','工商银行','建设银行','浦发银行'],
                num:"",
                type:""
            }
        },
        computed:{
            ...mapGetters([
                'userId',
                'userInfo'
            ])
        },
        props:{
            isAdd:{
                type:Boolean,
                default:false
            }
        },
        mounted(){
            this.userName=this.userInfo ? this.userInfo.BankTrueName : '';
            this.type=parseInt(this.$route.params.type);
            if(!this.isAdd){
                this.num=this.$route.params.num
            }
        },
        methods:{
            inputEvent(num){
                if(this.userName!=''||!/^[0-9]{16,19}$/g.test(this.bankNum)||!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.idCard)||!/^1[0-9]{10}$/.test(this.phone)) {
                    this.disSubmit = false;
                }
                if(num==0){
                    if(this.userName==''){
                        this.userTip='用户名不能为空';
                        this.disSubmit=true;
                    }else{
                        this.userTip='';
                    }
                }
                else if(num==1){
                    if(/^[0-9]{16,19}$/g.test(this.bankNum)){
                        this.bankNumTip=''
                    }else{
                        this.bankNumTip='卡号格式不正确';
                        this.disSubmit=true;
                    }
                }
                else if(num==2){
                    if(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.idCard)){
                        this.idTip='';
                    }else{
                        this.idTip='身份证号格式不正确';
                        this.disSubmit=true;
                    }
                }
                else if(num==3){
                    if(!/^1[0-9]{10}$/.test(this.phone)){
                        this.phoneTip='手机号格式不正确';
                        this.disSubmit=true;
                    }else{
                        this.phoneTip='';
                        this.disSubmit=false;
                    }
                }
            },
            nextTo(){
                let data={
                    "Name": this.userName,
                    "CardNumber": this.bankNum,
                    "Phone": this.phone,
                    "UserId": this.userId,
                    "IDCardNo": this.idCard,
                }
                if(this.isAdd){
                    if(!this.bankName){
                        this.bankNameTip="请先点击选择开户银行";
                        return ;
                    }
                    if(!this.checked){
                        this.$toast('请先阅读用户协议，并同意!');
                        return
                    }
                    data.BankName= this.bankName;
                }
               this.$emit('nextClick',data)
            },
            //确定选择银行卡
            bankConfirm(item){
                this.bankName=item;
                this.show=false;
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
    .radioBox{
        font-size:14px;
        padding:16px;
        background:#fff;
    }
    .radioBox span{
        color:#1989fa;
    }
</style>