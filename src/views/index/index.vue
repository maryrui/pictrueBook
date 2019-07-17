<template>
    <div class="home_box">
        <div v-html="goods ? goods.Description : ''">

        </div>
        <!--<van-button type="default" size="large" class="buyButton" @click="nowBuyClick">立即购买</van-button>-->
        <p class="buyBtn" @click="nowBuyClick">
            <van-icon name="shopping-cart"></van-icon>
        </p>
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
        padding:16px 16px 20px 16px;
    }
    .home_box img{
        width:100%;
    }
</style>
<style scoped>
    .buyBtn{
       position:fixed;
        bottom:15%;
        right:10%;
        width:50px;
        height:50px;
        padding:5px;
        background:rgba(255,255,255,.5);
        border-radius:50%;
        border:1px solid #ff5044;
        color:#ff5044;
        font-size:30px;
        box-sizing: border-box;
        text-align:center;
        line-height:50px;
    }
</style>
