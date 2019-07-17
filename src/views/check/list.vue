<template>
    <div class="bank_list">
        <ul>
            <li @click="$router.push('/bankExtract/'+income+'/'+1)">
                <div>
                    <img src="../../../static/images/wechatLogo.png" alt="">
                    <span>提现到零钱</span>
                </div>
                <van-icon name="arrow"></van-icon>
            </li>
            <li @click="$router.push('/bankExtract/'+income+'/'+0)">
               <div>
                   <img src="../../../static/images/bank_red.png" alt="">
                   <span>提现到银行卡</span>
               </div>
                <van-icon name="arrow"></van-icon>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "list",
        data(){
            return {
                income:0
            }
        },
        created(){
            this.income=parseInt(this.$route.params.id)
        }
    }
</script>

<style scoped>
    .bank_list{
        font-size:14px;
    }
    .bank_list li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:16px 16px;
        border-bottom:1px solid #f1f1f1;
    }
    .bank_list img{
        width:50px;
        height:40px;
    }
    .bank_list span{
        line-height:40px;
        margin-left:16px;
        vertical-align: top;
        display: inline-block;
    }
</style>