<template>
    <div class="home_box">
        <div v-html="goods ? goods.Description : ''">

        </div>
        <van-button type="default" size="large" class="buyButton" @click="nowBuyClick">立即购买</van-button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "index",
        data(){
            return {
                id:1001,
            }
        },
        created(){
            this.getDetail();
        },
        computed:{
            ...mapGetters([
                'goods',
            ])
        },
        methods:{
            getDetail(){
                this.$store.dispatch('getDetail').then(res=>{
                    if(res.Success){

                    }
                })
            },
            nowBuyClick(){
                localStorage.setItem('id',this.id);
                this.$router.push('/settlement');
            }
        }
    }
</script>

<style>
    .home_box{
        padding:16px 16px 100px 16px;
    }
    .home_box img{
        width:100%;
    }
</style>
<style scoped>
    .buyButton{
        background:#FF7EA3;
        color:#fff;
        border-radius:8px;
        border:0;
        position:fixed;
        width:90%;
        bottom:10%;
        left:50%;
        transform: translateX(-50%);
    }
</style>
