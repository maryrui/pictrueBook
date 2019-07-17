<template>
    <phone-code :isAdd="true" @btnClick="btnClick"></phone-code>
</template>

<script>
    import phoneCode from '@/components/phoneCode'
    import {findPassValidateBank} from '@/api/user'
    export default {
        name: "phoneCodeSms",
        methods:{
            btnClick(data){
                findPassValidateBank(data).then(res=>{
                    if(res.Success){
                        sessionStorage.setItem('setPass','find')
                        sessionStorage.setItem('setBank',JSON.stringify(data));
                        this.$router.push('/setPass');
                    }
                })
            }
        },
        components:{
            phoneCode
        }
    }
</script>

<style scoped>

</style>