<template>
    <div class="checkBox">
        <div>
            <div @click="$router.push('/checkDetail')">
                <i></i>
                <p>收益</p>
                <span>￥{{inCome.toFixed(2)}}</span>
            </div>
            <div @click="$router.push('/bank')">
                <i></i>
                <p>银行卡</p>
            </div>
        </div>
        <div class="button-box">
            <van-button type="danger" size="large" @click="$router.push('/checkList/'+inCome)">去提现</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                inCome:0,
            }
        },
        created(){
            this.inCome=parseInt(this.$route.params.id)
        }
    }
</script>

<style scoped>
    .checkBox{
        padding:16px;

    }
    .checkBox>div{
        display: flex;
        justify-content: space-around;
    }
    .checkBox>div>div{
        font-size:15px;
        width:50%;
        text-align:center;
        padding-top:30px;
    }
    .checkBox i{
        display: inline-block;
        width:32px;
        height:32px;
        background:url('../../../static/images/money_icon.png') no-repeat;
        background-size:100%;
    }
    .checkBox>div>div:last-child i{
        background:url('../../../static/images/bank.png') no-repeat;
        background-size:100%;
    }
    .checkBox>div:first-child{
        height:143px;
        background:#454545;
        border-radius:5px;
        color:#fff;
    }
    .button-box{
        margin-top:29px;
    }
</style>