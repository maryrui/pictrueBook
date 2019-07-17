<template>
    <div class="self_box">
        <ul>
            <li @click="setPic"><label>头像</label><p><img :src="user ? user.ImagePath : ''" alt=""> <van-icon name="arrow"></van-icon></p></li>
            <li @click="setName"><label>修改昵称</label><p>{{user ? user.Name : ""}}<van-icon name="arrow"></van-icon></p></li>
            <li @click="sexShow=true"><label>性别</label><p>{{sex}}<van-icon name="arrow"></van-icon></p></li>
        </ul>
        <div class="self_btn">
            <van-button type="danger" size="large" @click="saveClick">保存</van-button>
        </div>
        <van-popup v-model="sexShow"  position="bottom" :overlay="true">
            <van-picker :columns="columns" show-toolbar
                @cancel="sexShow=false"
                cancel-button-text="取消"
                confirm-button-text="确定"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import {getUserInfo,setUserInfo} from '@/api/user'
    import {mapGetters} from 'vuex'
    import { ImagePreview } from 'vant';
    export default {
        name: "self",
        data(){
            return {
                sexShow:false,
                columns:['女','男'],
                user:{

                },
            }
        },
        computed:{
            ...mapGetters([
                'userId'
            ]),
            sex:{
                get(){
                    if(this.user.Gender==1){
                        return "男"
                    }
                    else if(this.user.Gender==2){
                        return "女"
                    }
                    else{
                        return "设置"
                    }
                },
                set(newVal){
                    this.user.Gender=newVal
                }
            }
        },
        created(){
            this.fetchData();

        },
        methods:{
            fetchData(){
                getUserInfo({userId:this.userId}).then(res=>{
                    if(res.Success){
                        this.user=res.Data;
                        if(sessionStorage.getItem('name')){
                            this.user.Name=sessionStorage.getItem('name')
                        }
                    }
                })
            },
            //选择性别
            onConfirm(item,index){
                if(index>0){
                    this.user.Gender=1
                }else{
                    this.user.Gender=2
                }
                this.sexShow=false;
            },
            //修改头像
            setPic(){
                ImagePreview([
                    this.user.ImagePath
                ])
            },

            //点击昵称
            setName(){
                sessionStorage.setItem('name',this.user.Name);
                this.$router.push('/selfName')
            },
            //提交
            saveClick(){
                setUserInfo({
                    userId:this.userId,
                    "ImagePath": this.user.ImagePath,
                    "Name": this.user.Name,
                    "Gender": this.user.Gender
                }).then(res=>{
                    if(res.Success){
                        sessionStorage.removeItem('name')
                        this.$router.push('/user')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .self_box{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#e7e7e7;
    }
    .self_box ul{
        margin-top:8px;
        padding:0 16px 0;
        background: #fff;
    }
    .self_box>.self_btn{
        margin-top:54px;
        padding:0 16px;
    }
    .self_box>div button{
        border-radius:8px;
    }
 .self_box li{
    display: flex;
    justify-content: space-between;
     height:55px;
     align-items: center;
     border-bottom:1px solid #e7e7e7;
     font-size:15px;
     color:#333;
     line-height:55px;
 }
    .self_box p{
        color:#999;
        display: flex;
        align-items: center;
    }
    .self_box p i{
        margin-left:6px;
    }
    .self_box li:last-child p{
        color:#ff5044;
    }
    .self_box li:last-child i{
        color:#999;
    }
    .self_box img{
        width:30px;
        height:30px;
        border-radius:50%;
    }
</style>