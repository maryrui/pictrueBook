<template>
    <integral-detail :list="list" @selectTimeClick="selectTimeClick" :isSale="true"></integral-detail>
</template>

<script>
    import {getSaleList} from '@/api/sale'
    import integralDetail from '@/components/integralDetail'
    import {mapGetters} from 'vuex'
    export default {
        name: "index",
        data(){
            return {
                currentDate: new Date(),
                timeShow:false,
                list:[],
                num:0
            }
        },
        created(){
            this.num=this.$route.params.num;
            this.init();
        },
        computed:{
            ...mapGetters([
                'userId',
                'userInfo'
            ])
        },
        components:{
            integralDetail
        },
        methods: {
            init(){
                getSaleList({
                    userId:this.userId,
                    /*  incomeType:6,
                    startTime:this.currentDate.getFullYear()+'/'+(this.currentDate.getMonth()+1)+'/1',
                     endTime:''+this.currentDate.getFullYear()+'/'+(this.currentDate.getMonth()+1)+'/'+new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()+1,0).getDate()*/
                }).then(res=>{
                    if(res.Success){
                        this.list=res.Data;
                    }
                })
            },
            selectTimeClick(item){
                this.currentDate=item;
                this.init();
            },
        }
    }
</script>

<style scoped>
    .sale_box{


    }
    .sale_top{
        padding:30px;
        font-size:18px;
        color:#fff;
        background:#515154;
        line-height:35px;
        text-align:center;
    }
    .time_select{
        font-size:14px;
        text-align:left;
        line-height:35px;
        padding-left:16px;
    }
    .sale_box ul{
        font-size:14px;
    }
    .sale_box li{
        display: flex;
        padding:16px 16px;
        border-bottom:1px solid #f7f7f7;
    }
    .sale_box li img{
        width:100%;
    }
    .sale_box li>div:first-of-type{
        width:45%;
    }
    .sale_box li>div:last-of-type{
        text-align:center;
    }
    .sale_box li>div:last-of-type span{
        color:#ff5044;
    }
    .sale_box li>p{
        width:40px;
        overflow: hidden;
        height:40px;
        border-radius:50%;
        border:1px solid #f1f1f1;
        margin-right:16px;
    }
</style>