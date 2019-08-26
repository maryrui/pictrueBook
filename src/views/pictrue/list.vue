<template>
    <div class="list_box">
        <ul class="list_item">
            <li v-for="(item,index) in list" :key="item.Id" @click="$router.push('/pictrueDetail/'+item.Id)">
                <p><img :src="item.ImagePath" alt=""></p>
                <p class="van-ellipsis">{{item.Name}}</p>
                <p>
                    <i class="gem"></i> {{item.Integral}}  <span>原价：￥<i style="color:#ff5044;font-style: normal">{{item.Price}}</i></span>
                </p>
                <p>库存：{{item.Sku}}</p>
                <p><button @click="$router.push('/exchangeOrder/'+item.Id)">立即兑换</button></p>
            </li>
        </ul>
        <div class="footer">
            <van-pagination
                v-model="currentIndex"
                :page-count="Math.ceil(count/pageSize)"
                mode="simple"
                @change="pageFetch"
            />
        </div>
    </div>
</template>

<script>
    import {getHotPictrue,getAgePictrue,getTypePictrue} from '@/api/pictrue'
    export default {
        name: "list",
        data(){
            return {
                type:"",
                age:"",
                id:"",
                pageIndex:1,
                currentIndex:0,
                pageSize:20,
                list:[],
                count:0
            }
        },
        created(){
            this.type=this.$route.params.type;
            this.age=this.$route.params.age;
            this.id=this.$route.params.id;
            this.fetchData(this.type);
        },
        methods:{
            fetchData(type){
                //热门专区
                if(type==0){
                    getHotPictrue({
                        pageindex:this.pageIndex,
                        pagesize:this.pagesize
                    }).then(res=>{
                        this.list=res.Data.Books;
                        this.count=res.Data.Count;
                    })
                }
                //年龄段
                else if(type==1){
                    getAgePictrue({
                        pageindex:this.pageIndex,
                        pagesize:this.pagesize,
                        bookAge:this.age
                    }).then(res=>{
                        this.list=res.Data.Books;
                        this.count=res.Data.Count;
                    })
                }
                //内容分类
                else if(type==2){
                    getTypePictrue({
                        pageindex:this.pageIndex,
                        pagesize:this.pagesize,
                        id:this.id
                    }).then(res=>{
                        this.list=res.Data.Books;
                        this.count=res.Data.Count;
                    })
                }
            },
            pageFetch(item){
                this.pageIndex=item;
                this.fetchData(this.type);
            }
        }
    }
</script>

<style scoped>
    .list_box{
        font-size:14px;
        border-bottom:1px solid transparent;
    }
    .list_item{
        overflow: hidden;
        padding:16px;
        margin-bottom:50px;
        background:#f7f7f7;
    }
    .list_box li{
        float:left;
        width:48%;
        background:#fff;
        border-radius:8px;
        overflow: hidden;
        margin-bottom:16px;
        /*text-align: center;*/
    }
    .list_box li:nth-child(2n){
        margin-left:4%;
    }
    .list_box li img{
        padding:10px;
        box-sizing: border-box;
        width:100%;
        height:164px;
    }
    .list_box li i{
        vertical-align: middle;
        position:relative;
        top:-2px;
    }
    .list_box li p{
        vertical-align: middle;
        font-size:12px;
        line-height:25px;
    }
    .list_box li p:nth-of-type(3){
        color:#ff5044;
        padding:0 10px;
        font-size:12px;
    }
    .list_box li p:nth-of-type(3) span{
        font-size:14px;
        color:#666;
        margin-left:5px;
    }
    .list_box li p:nth-of-type(2){
        padding:0 10px;
    }
    .list_box li p:nth-of-type(4){
        padding:0 10px;
    }
    .list_box li button{
        display: inline-block;
        width:100%;
        height:30px;
        text-align:center;
        background: #ff5044;
        color:#fff;
        border:0;
    }
    .footer{
        padding:16px 0;
        background:#f7f7f7;
        margin-top:70px;
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
    }
</style>