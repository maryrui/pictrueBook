<template>
    <div class="order_box">
        <ul class="list">
            <li v-for="(item,index) in list" :key="index">
                <div>
                    <div class="middle" @click="$router.push('/afterDetail/'+item.OrderNumber)">
                        <img :src="item.ImagePath" alt="">
                        <p>
                            {{item.Name}}
                        </p>
                        <div>
                            <span>￥{{item.Money}}</span> <br>
                            <b>× {{item.Count}}</b>
                        </div>
                    </div>
                    <div class="bottom">
                        <p>
                            <button class="enter" @click="cancelAfter(item.OrderNumber,index)">取消售后</button>
                            <button class="danger" @click="enterSuccess(item.OrderNumber,index)">确认完成</button>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getAfterList,setOrderState} from '@/api/order'
    import {mapGetters} from 'vuex'
    export default {
        name: "order",
        data(){
            return {
                list:[]
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            //获取数据
            fetchData(){
                getAfterList({userId:this.userId}).then(res=>{
                    if(res.Success){
                        if(res.Data.length<1){
                            this.$toast('暂无售后申请');
                            return ;
                        }
                        this.list=res.Data;
                    }
                })
            },
            //取消售后
            cancelAfter(code,index){
               this. $dialog.confirm({
                    title: '取消售后',
                    message: '是否确认取消售后，一个订单只能申请一次售后，售后取消后，不可再次申请售后？'
                }).then(() => {
                   setOrderState({
                       userId:this.userId,
                       OrderNumber:code,
                       OrderState:"waitHarvest",
                       CancelReason:''
                   }).then(res=> {
                       if (res.Success) {
                           this.cancelShow=false;
                           this.list.splice(index,1)
                           this.$toast('操作成功');
                       }
                   })
                }).catch(() => {
                    // on cancel
                });
            },
            //确认完成
            enterSuccess(code,index){
                this. $dialog.confirm({
                    title: '确认完成',
                    message: '是否确认执行该操作，确认完成后订单不能重复申请售后？'
                }).then(() => {
                    setOrderState({
                        userId:this.userId,
                        OrderNumber:code,
                        OrderState:"waitHarvest",
                        CancelReason:''
                    }).then(res=> {
                        if (res.Success) {
                            this.cancelShow=false;
                            this.list.splice(index,1)
                            this.$toast('操作成功');
                        }
                    })
                }).catch(() => {

                });
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
    .order_box{

    }
    .order_box .list{
        background:#F3F4F6;
        border-top:1px solid transparent;
        border-bottom:8px solid #E7E7E7;
    }
    .order_box .list li{
        background: #fff;
        padding:0  16px;
        font-size:14px;
        margin-top:8px;
    }
    .order_box .list li .middle{
        display: flex;
        padding:10px 0;
        border-bottom:1px solid #E7E7E7;
    }
    .order_box .list li .middle img{
        width:72px;
        height:72px;
    }
    .order_box .list li .middle>p{
        width:63%;
        margin-left:10px;
    }
    .order_box .list li .middle>div{
        text-align: right;
        width:15%;
    }
    .order_box .list li .bottom{
        padding:10px 0;
        text-align: right;
    }
    .order_box .list li .bottom b{
        color:#FF7EA3;
    }
    .order_box .list li .bottom>div span{
        color:#999999;
        margin-left:3px;
    }
    .order_box .list li .bottom>div{
        padding:8px 0;
    }
    .order_box .list li .bottom button{
        width:72px;
        height:25px;
        text-align:center;
        border:1px solid #A6A6A6;
        background:#fff;
        border-radius:3px;
        font-size:12px;
        margin-left:20px;
    }
    .order_box .list li .bottom button.enter{
        border-color:#FF7EA3;
        color:#FF7EA3;
    }
</style>