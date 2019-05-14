<template>
    <div class="box">
        <img :src="url" alt="">
        <p>请长按二维码图片保存，再分享</p>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getGeneralize} from '@/api/user'
    export default {
        name: "index",
        data(){
            return {
                url:""
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                getGeneralize({userId:this.userId}).then(res=>{
                    if(res.Success){
                        this.url=res.Data;
                    }
                })
            }
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        }
    }
</script>

<style scoped>
    .box{
        width:120px;
        height:120px;
        position: absolute;
        top:50%;
        left:50%;
        font-size:15px;
        color:#999;
        transform: translate(-50%,-50%);
    }
    .box img{
        width:100%;
    }
</style>