<template>
    <phone-code :isAdd="true" @btnClick="btnClick"></phone-code>
</template>

<script>
    import phoneCode from '@/components/phoneCode'
    import {addBank} from '@/api/bank'
    import {mapGetters} from 'vuex'
    export default {
        name: "phoneCodeSms",
        components:{
            phoneCode
        },
        computed:{
            ...mapGetters([
                'userInfo'
            ])
        },
        methods:{
            btnClick(data){
                addBank(data).then(res=>{
                    if(res.Success){
                        sessionStorage.setItem('setPass','add');
                        if(!this.userInfo.IsSetPassword){
                            sessionStorage.setItem('setBank',JSON.stringify(data));
                            this.$router.push('/setPass');
                        }else{
                            this.$router.push('/bank')
                        }
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>