<template>
    <div>
        <bank-validate :isAdd="false" @nextClick="nextTo"></bank-validate>
    </div>
</template>

<script>
    import bankValidate from '@/components/validatBank'
    import {findPassValidateBank} from '@/api/user'
    export default {
        name: "validateBankInfo",
        data(){
            return {
                id:""
            }
        },
        components:{
            bankValidate
        },
        created(){
            this.id=this.$route.params.id
        },
        methods:{
            nextTo(data){
                data.BankCardId=this.id;
                findPassValidateBank(data).then(res=>{
                    if(res.Success){
                        sessionStorage.setItem('bank',JSON.stringify(data));
                        if(sessionStorage.getItem('bank')){
                            this.$router.push('/passCode/'+data.Phone+'/12')
                        }
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>