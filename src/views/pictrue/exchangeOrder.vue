<template>
    <down-order :isPay="false" @orderClick="orderClick"></down-order>
</template>

<script>
    import downOrder from '@/components/downOrder'
    import {downSubmit} from '@/api/pictrue'
    export default {
        name: "exchangeOrder",
        components:{
            downOrder
        },
        methods:{
            orderClick(data){
                downSubmit(data).then(res=>{
                    if(res.Success){
                        this.$toast('兑换成功');
                        this.$router.push('/order/2');
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>