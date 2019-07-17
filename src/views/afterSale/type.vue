<template>
    <div class="type_box">
        <div class="goods_box">
            <img :src="detail ? detail.ImagePath : ''" alt="">
            <p>
              {{detail ? detail.ProductName :''}}
            </p>
            <div>
                <span>￥{{detail.Price}}</span> <br>
                <b>× {{detail.Count}}</b>
            </div>
        </div>
        <div class="goods_select">
            <div>
                <span>申请数量</span>
                <van-stepper
                    v-model="num"
                    integer
                    :min="1"
                    :max="detail.Count"
                    :step="1"
                />
            </div>
            <div @click="$router.push('/return/'+detail.OrderNumber)">
                <span>退货</span>
                <van-icon name="arrow"></van-icon>
            </div>
            <div @click="$router.push('/exchange/'+detail.OrderNumber)">
                <span>换货</span>
                <van-icon name="arrow"></van-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import {getOrder} from '@/api/order'
    export default {
        name: "type",
        data(){
            return{
                num:1,
                // maxNum:1,
                detail:{}
            }
        },
        created(){
            this.fetchData({orderNumber:this.$route.params.num})
        },
        methods:{
            fetchData(data){
                getOrder(data).then(res=>{
                    if(res.Success){
                        this.detail=res.Data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .type_box{
        font-size:14px;
    }
    .goods_box{
        display: flex;
        padding:10px 16px;
        align-items: center;
        border-bottom:8px solid #E7E7E7;
    }
    .goods_box img{
        width:72px;
        height:72px;
    }
    .goods_box>p{
        width:63%;
        margin-left:10px;
    }
    .goods_box>div{
        text-align: right;
        width:15%;
    }
    .goods_select{
        padding:0 16px;
    }
    .goods_select>div{
        font-size:16px;
        font-weight:700;
        display: flex;
        justify-content: space-between;
        border-bottom:1px solid #EBEBEB;
        height:58px;
        align-items: center;
    }
</style>