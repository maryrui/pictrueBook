<template>
    <div class="setPass_box">
        <p>为保证您的资金安全，请设置提现密码</p>
        <div>
            <van-field
                    readonly
                    label="密码"
                    left-icon="lock"
                    type="password"
                    clickable
                    :value="value"
                    @touchstart.native.stop="show = true;show1=false"
            />

            <van-number-keyboard
                    v-model="value"
                    :show="show"
                    :maxlength="6"
                    @blur="show = false"
            />
            <van-field
                readonly
                label="确认密码"
                left-icon="lock"
                type="password"
                clickable
                :value="value1"
                @touchstart.native.stop="show1 = true;show = false;"
            />

            <van-number-keyboard
                    v-model="value1"
                    :show="show1"
                    :maxlength="6"
                    @blur="show1 = false;"
            />
        </div>
        <van-button type="danger" size="large" @click="nextClick">下一步</van-button>
    </div>
</template>

<script>
    import {addBank} from "../../api/bank";
    import {findPassValidateBank} from '@/api/user'
    export default {
        name: "setPass",
        data(){
            return {
                show:false,
                value1:"",
                show1:false,
                value:""
            }
        },
        created(){
            if(!sessionStorage.getItem('setPass')){
                this.$dialog.alert({
                    title: '提示',
                    message: '请按步骤进入该操作页面'
                }).then(() => {
                    // on close
                    this.$router.go(-1)
                });
            }
        },
        methods:{
            nextClick(){
                if(this.value.length<6){
                    this.$toast('请输入6位数密码');
                    return ;
                }
                if(this.value1.length<6){
                    this.$toast('请输入6位数重复密码');
                    return ;
                }

                if(this.value!==this.value1){
                    this.$toast('两次输入的密码不一致');
                    return ;
                }
                var data=JSON.parse(sessionStorage.getItem('setBank'));
               data.Password=this.value1;
                if(sessionStorage.getItem('setPass')=='find'){
                    console.log(0)
                    findPassValidateBank(data).then(res=>{
                        if(res.Success){
                            this.$dialog.alert({
                                title: '提示',
                                message: '设置成功'
                            }).then(() => {
                                // on
                                this.$router.push('/bankExtract')
                            });

                        }
                    })
                }else{
                    addBank(data).then(res=>{
                        if(res.Success){
                            this.$dialog.alert({
                                title: '提示',
                                message: '添加成功'
                            }).then(() => {
                                // on
                                this.$router.push('/bank')
                            });

                        }
                    })
                }
                sessionStorage.removeItem('setBank')
            }
        }
    }
</script>

<style scoped>
    .setPass_box{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        font-size:14px;
        padding:16px;
        background:#f1f1f1;
        box-sizing: border-box;
    }
    .setPass_box>p{
        line-height:35px;
        margin-bottom:25px;
    }
    .setPass_box>div{
        border-radius:8px;
        padding:16px 0 32px 0;
        background:#fff;

    }
    .setPass_box>button{
        margin-top:55px;
    }
</style>