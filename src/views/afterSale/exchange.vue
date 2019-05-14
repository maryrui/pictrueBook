<template>
    <div class="exchange">
        <div class="goods_box">
            <img :src="detail.Product ? detail.Product.ImagePath : ''" alt="">
            <p>
                {{detail.Product ? detail.Product.Name : ''}}
            </p>
            <div>
                <span>￥{{detail.Price}}</span> <br>
                <b>× {{detail.Count}}</b>
            </div>
        </div>
        <div class="content">
            <div>
                <span>换货数量</span>
                <van-stepper
                        v-model="num"
                        integer
                        :min="1"
                        :max="detail.Count"
                        :step="1"
                />
            </div>
            <!--<div>
                <span>退款金额</span>
                <b>￥{{num*detail.Price}}</b>
                <span>（以实际退款金额为准）</span>
            </div>
            <div>
                <span>退款方式</span>
                <span>退至付款账户</span>
            </div>-->
            <div @click="cancelShow=true">
                <span>换货原因</span>
                <span class="text">{{reason ? reason : '请选择退货原因'}}</span>
                <van-icon name="arrow"></van-icon>
            </div>
        </div>
        <div class="upload_box">
            <p>问题描述</p>
            <div>
                <textarea name="" id="" cols="30" rows="3" placeholder="请在此描述详细问题（选填）" v-model="describe" @keydown="changeDes"></textarea>
                <p>{{describe.length>60 ? 60 : describe.length}}/60</p>
                <div class="upload">
                    <div v-for="(item,index) in fileList" :key="index">
                        <img :src="item" alt="">
                    </div>
                    <div>
                        <van-uploader :after-read="onRead">
                            <van-icon name="photograph" />
                        </van-uploader>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <van-button type="danger" size="large" @click="submit">提交申请</van-button>
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
    import {getOrder,commitReplace,uploadImg} from '@/api/order'
    import {mapGetters} from 'vuex'
    export default {
        name: "exchange",
        data(){
            return {
                num:1,
                describe:"",
                fileList:[],
                detail:{},
                cancelShow:false,
                columns:['少发/漏发，配件不齐全','质量问题','包装商品破损','其它'],
                reason:"",
            }
        },
        created(){
            this.fetchData({orderNumber:this.$route.params.num})
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        methods:{
            //获取订单详情
            fetchData(data){
                getOrder(data).then(res=>{
                    if(res.Success){
                        this.detail=res.Data;
                    }
                })
            },
            onRead(files,detail){
                if(this.fileList.length>2){
                    this.$toast('图片不能超过三个');
                    return false;
                }
                this.fileList.push(files.content)
            },
            changeDes(){
                if(this.describe.length>59){
                    this.describe=this.describe.substring(0,60)
                }
            },
            //理由确认
            onConfirm(item){
                this.reason=item;
                this.cancelShow=false;
            },
            //理由取消
            onCancel(){
                this.cancelShow=false;
            },
            //提交申请
            submit(){
                let img=[];
                if(this.fileList.length>0){
                    uploadImg(this.fileList).then(res=>{
                        if(res.Success){
                            commitReplace({
                                "OrderNumber": this.detail.OrderNumber,
                                "UserId": this.userId,
                                "Count": this.detail.Count,
                                "Reason": this.reason,
                                "Description": this.describe,
                                "ImageList":res.Data
                            }).then(res=>{
                                if(res.Success){
                                    this.$toast('申请成功');
                                    this.$router.push('/afterDetail/'+this.detail.OrderNumber)
                                }
                            })
                        }
                    })
                }else{
                    commitReplace({
                        "OrderNumber": this.detail.OrderNumber,
                        "UserId": this.userId,
                        "Count": this.detail.Count,
                        "Reason": this.reason,
                        "Description": this.describe,
                        "ImageList":[]
                    }).then(res=>{
                        if(res.Success){
                            this.$toast('申请成功');
                            this.$router.push('/afterDetail/'+this.detail.OrderNumber)
                        }
                    })
                }

            }
        }
    }
</script>

<style scoped>
    .exchange{
        font-size:14px;
    }
    .goods_box{
        display: flex;
        padding:10px 16px;
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
    .content{
        padding:0 16px;
        font-size:16px;
    }
    .content>div{
        height:60px;
    }
    .content>div{
        display: flex;
        justify-content: space-between;
        border-bottom:1px solid #EBEBEB;
        align-items:center;
    }
    .content b{
        color:#FF7EA3;
        font-weight:500;
    }
    .content>div b+span{
        color:#999;
        font-weight:500;
    }
    .content>div>span{
        font-weight:700;
    }
    .content>div:nth-child(3)>span:last-child{
        font-weight:500;
        width:70%;
    }
    .content>div .text{
        color:#999;
        font-size:14px;
        font-weight:500;
        width:55%;
    }
    .upload_box{
        padding:0 16px;
    }
    .upload_box>p{
        font-size:16px;
        font-weight:700;
        line-height:60px;
    }
    .upload_box>div{
        background:#F3F4F6;
        padding-bottom:16px;
    }
    .upload_box>div>p{
        text-align:right;
        padding-right:16px;
    }
    .upload_box textarea{
        background:0;
        border:0;
        width:100%;
        padding:16px;
        box-sizing: border-box;
    }
    .upload{
        display: flex;
    }
    .upload>div{
        width:65px;
        height:65px;
        background:#fff;
        text-align:center;
        line-height:65px;
        font-size:30px;
        color:#999;
        margin-left:15px;
    }
    .upload img{
        width:100%;
        height:100%;
    }
    .footer{
        padding:0 16px;
        margin-top:24px;
    }
    .loading{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,.3)
    }
    .loading>div{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
</style>