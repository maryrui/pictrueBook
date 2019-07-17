<template>
    <div>
        <bank-validate :isAdd="true" @nextClick="nextClick"></bank-validate>
    </div>
</template>

<script>
    import bankValidate from '@/components/validatBank'
    import {addBank} from '@/api/bank'
    export default {
        name: "add",
        components:{
            bankValidate
        },
        methods:{
            nextClick(data){
                addBank(data).then(res=>{
                    if(res.Success){
                        sessionStorage.setItem('bank',JSON.stringify(data));
                        if(sessionStorage.getItem('bank')){
                            this.$router.push('/bankCode/'+data.Phone+'/11')
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>