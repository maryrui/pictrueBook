<template>
    <bank-list :isFind="true"></bank-list>
</template>

<script>
    import bankList from '@/components/bankList'
    export default {
        name: "index",
        components:{
            bankList
        },
        methods:{
            getList(){
                getBankList({userId:this.userId}).then(res=>{
                    if(res.Success){
                        this.list=res.Data;
                    }
                })
            },

        }
    }
</script>

<style scoped>

</style>