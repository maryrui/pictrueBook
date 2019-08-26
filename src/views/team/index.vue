<template>
    <div class="teamBox">
        <van-tabs v-model="active" @click="fetchData">
            <van-tab title="一级">
                <ul>
                    <li v-for="(item,index) in list.OneLevel" :key="index">
                        <div>
                            <p><img :src="item.ImagePath" alt=""></p>
                            <div>
                                <span>{{item.NickName}}</span>
                                <p>{{item.CreateTime}}</p>
                            </div>
                            <i>{{item.Count}}</i>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="二级">
                <ul>
                    <li v-for="(item,index) in list.SecondLevel" :key="index">
                        <div>
                            <p><img :src="item.ImagePath" alt=""></p>
                            <div>
                                <span>{{item.NickName}}</span>
                                <p>{{item.CreateTime}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getTeamList} from "../../api/team";

    export default {
        name: "index",
        data(){
            return {
                active:0,
                list:[]
            }
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                getTeamList({
                    userId:this.userId,
                    userLevel:this.active+1,
                    pageIndex:1,
                    pageSize:1000
                }).then(res=>{
                    if(res.Success){
                        this.list=res.Data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .teamBox ul{
        padding:0 16px
    }
    .teamBox li{
        padding:16px 0;
        font-size:14px;
        border-bottom:1px solid #f7f7f7;
    }
    .teamBox li>div{
        display: flex;
        align-items: center;
    }
    .teamBox li>div div{
        width:60%;
        line-height:30px;
        margin-left:16px;
    }
    .teamBox li>div i{
        width:20%;
        text-align: right;
        font-style: normal;
        color:#ff5044;
    }
    .teamBox li>div img{
        width:40px;
        height:40px;
        border-radius: 50%;
        border:1px solid #f1f1f1;
    }
</style>