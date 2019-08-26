<template>
    <div class="detail_box">
        <div class="content" v-html="pictrueDetail.Description" ref="content">

        </div>
        <div class="footer">
            <p>
                积分：{{pictrueDetail.Integral}}
            </p>
            <p>
                <button class="exchangeClick" @click="$router.push('/exchangeOrder/'+id)">立即兑换</button>
            </p>
        </div>
    </div>
</template>

<script>
    import {getPictrueDetail} from "@/api/pictrue";

    export default {
        name: "detail",
        data(){
            return {
                pictrueDetail:"",
                id:""
            }
        },
        created(){
            this.id=this.$route.params.id;
           this.fetchData(this.$route.params.id);
        },
        mounted(){
            // console.log(document.querySelectorAll('.content video'));


        },
        methods:{
            fetchData(id){
                getPictrueDetail({
                    id:id
                }).then(res=>{
                    if(res.Success){
                        this.pictrueDetail=res.Data;
                        this.$nextTick(() => {
                            let video=document.getElementsByTagName('video')[0];
                            if(video){
                                video.setAttribute('poster',res.Data.ImagePath)
                            }
                        })

                    }
                })
            },
            exchangeClick(){

            }
        }
    }
</script>
<style>
    .detail_box  .content img{
        width:100%;
    }
</style>
<style scoped>
    .detail_box{
        font-size:14px;
    }
    .detail_box  .content{
        padding:16px;
        margin-bottom:70px;
    }
    .footer{
        color:#ff5044;
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
        height:50px;
        background:#fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top:1px solid #f1f1f1;
        text-align: center;
    }
    .footer>p{
        width:50%;
    }
    .footer button{
        display: inline-block;
        width:100%;
        height:50px;
        background:#ff5044;
        color:#fff;
        border:0;
    }
    .iconGem{
        position:relative;
        top:2px;
    }
    .content video{
        width:100% !important;
    }
</style>