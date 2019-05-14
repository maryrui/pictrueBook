<template>
    <div class="express_box">
        <div class="express">
            <div @click="cancelShow=true">
                <b>选择快递公司</b><span>{{expressCompany ? expressCompany : '请选择快递公司'}}</span>
            </div>
            <div>
                <b>填写快递单号</b><input type="text" v-model="num">
            </div>
            <div class="btn_box">
                <van-button type="danger" size="large" @click="submit">确认提交</van-button>
            </div>
        </div>
        <van-popup v-model="cancelShow"  position="bottom" :overlay="true">
            <van-picker :columns="columns" show-toolbar
                @cancel="onCancel"
                cancel-button-text="取消"
                confirm-button-text="确认"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getExpressList,setExpress} from '@/api/order'
    export default {
        name: "express",
        data(){
            return {
                cancelShow:false,
                code:"",
                expressCompany:"",
                num:"",
                columns:[],
                list:{},
                currentIndex:0
            }
        },
        created(){
            this.code=this.$route.params.num;
            this.fetchData();
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        methods:{
            //获取数据
            fetchData(){
                getExpressList().then(res=>{
                    if(res.Success){
                        this.list=res.Data;
                        for(let i=0;i<res.Data.length;i++){
                            this.columns.push(res.Data[i].Text);
                        }
                    }
                })
            },
            //快递确认
            onConfirm(item,index){
                this.expressCompany=item;
                this.currentIndex=index
                this.cancelShow=false;
            },
            //快递取消
            onCancel(){
                this.cancelShow=false;
            },
            submit(){
                if(!this.expressCompany){
                    this.$toast('请选择快递公司名称');
                    return ;
                }
                if(!this.num){
                    this.$toast('请选择快递公司单号');
                    return ;
                }
                setExpress({
                    "OrderNumber": this.code,
                    "UserId": this.userId,
                    "LogisticCode":this.num,
                    "ShipperCode":  this.list[this.currentIndex].Value,
                    "ExpressCompany": this.list[this.currentIndex].Text
                }).then(res=>{
                    if(res.Success){
                        this.$toast('提交成功');
                        this.$router.go(-1);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .express{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#F3F4F6;
    }
    .express{
        background:#fff;
        padding:16px;
        font-size:14px;
        box-sizing: border-box;
    }
    .express>div{
        display: flex;
        height:50px;
        align-items: center;
        border-bottom:1px solid #ddd;
    }
    .express>div span{
        padding-left:15px;
    }
    .express>div input{
        border:0;
        padding-left:15px;
    }
    .btn_box{
        margin-top:25px;
    }
</style>