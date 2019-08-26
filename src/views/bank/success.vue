<template>
    <div class="successBox">
        <div>
            <p>
                <van-icon name="success"></van-icon>
            </p>
            <h2>提现申请成功，等待银行处理</h2>
            <span>预估2-4个工作日</span>
        </div>
        <ul>
            <li>
                <p>提现金额</p>
                <span>￥ {{listData.amount}}</span>
            </li>
            <li>
                <p>到账银行</p>
                <span>{{listData.bank}}</span>
            </li>
            <li>
                <p>扣除税费</p>
                <span>-￥ {{Math.ceil(listData.amount*0.05)}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "sucess",
        data(){
            return {
                listData:""
            }
        },
        mounted(){
            this.listData=JSON.parse(sessionStorage.getItem('extract'));
        }
    }
</script>

<style scoped>
    .successBox{
        padding:16px;
    }
    .successBox>div{
        text-align: center;
        font-size:14px;
        color:#333;
        padding-bottom:35px;
        border-bottom:1px solid #ddd;
    }
    .successBox>div>p{
        color:#fff;
        width:60px;
        height:60px;
        background:#07c160;
        font-size:40px;
        padding-top:10px;
        box-sizing: border-box;
        border-radius:50%;
        margin:0 auto;
    }
    .successBox>div>h2{
        line-height:85px;
    }
    .successBox ul{
        margin-top:25px;
        font-size:14px;
        color:#999;
    }
    .successBox li{
        display: flex;
        line-height:65px;
        justify-content: space-between;
        /*border-bottom:1px solid #ccc;*/
    }
</style>