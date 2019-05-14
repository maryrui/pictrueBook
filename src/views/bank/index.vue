<template>
    <div class="bank_box">
        <ul>
            <li v-for="(item,index) in list" :key="item.id">
                <img :src="item.ImagePath" alt="">
                <div>
                    <h2>{{item.BankName}}</h2>
                    <span>{{item.CardTypeName}}</span>
                    <p>{{item.CardNumber}}</p>
                </div>
            </li>
        </ul>
        <div @click="$router.push('/bankAdd')">
            <p><van-icon name='plus'></van-icon>   添加银行卡</p> <van-icon name="arrow"></van-icon>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getBankList} from '@/api/bank.js'
    export default {
        name: "index",
        data(){
            return {
                list:[]
            }
        },
        created(){
            this.getList();
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
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
    .bank_box{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        font-size:16px;
        background:#F3F4F6;
    }
    .bank_box ul{
        padding:0 16px;
    }
    .bank_box ul li{
        background:#fff;
        display: flex;
        padding:16px;
        border-radius:5px;
        margin-top:16px;
        color:#999;
    }
    .bank_box ul li img{
        width:40px;
        height:40px;
        border-radius:50%;
        margin-right:15px;
    }
    .bank_box ul li h2{
        color:#333;
        font-size:18px;
        /*margin-bottom:10px;*/
    }
    .bank_box ul li p{
        font-size:20px;
        margin-top:8px;
    }
    .bank_box>div{
        height:56px;
        display: flex;
        justify-content: space-between;
        background:#fff;
        margin-top:16px;
        font-size:16px;
        color:#999;
        align-items: center;
        padding:0 16px;
        font-weight:700;
    }
</style>