<template>
    <div class="detail">
        <div class="top">
            <p @click="show=true">{{time}} <van-icon name="arrow-down"></van-icon></p>
            <div>
                支出 ¥{{parseFloat(detail.Expense).toFixed(2)}}   收入 ¥ {{parseFloat(detail.Income).toFixed(2)}}
            </div>
        </div>
        <div class="list">
            <ul>
                <li v-for="(item,index) in detail.BillList" :key="index">
                   <p> <img :src="item.ImagePath" alt=""></p>
                    <div>
                        <h2><b>{{item.Title}}</b><span>{{item.Money}}</span></h2>
                        <p>{{item.Remark}}</p>
                        <span>{{item.DateTime}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <van-popup v-model="show" position="top" :overlay="true" overlay-class="maskBg">
            <div class="select_box">
                <div>
                    <p>交易时间</p>
                    <ul>
                        <li v-for="(item,index) in selectList" :key="index" @click="searchClick(index)" :class="{active:currentIndex==index}">{{item}}</li>
                    </ul>
                </div>
                <div>
                    <p>自定义</p>
                    <div class="custom_box">
                        <p @click="selectClick(0)"><span>{{startime}}</span> <van-icon name="arrow-down" /></p>
                        -
                        <p @click="selectClick(1)">{{endtime}} <van-icon name="arrow-down"/></p>
                        <van-button type="danger" size="small" @click="timeClick">确定</van-button>
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="showTime" position="bottom" :overlay="true">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="selectTime"
            />
        </van-popup>
    </div>
</template>

<script>
    import {getBill} from "../../api/user";
    import {mapGetters} from 'vuex'
    export default {
        name: "detail",
        data(){
            return{
                show:false,
                detail:{},
                showTime:false,
                startime:this.formateDate(new Date()).substr(0,8)+'01',
                endtime:this.formateDate(new Date()),
                currentDate:new Date(),
                selectList:['本月','上月','今年','最近一年'],
                currentIndex:0,
                selectIndex:0,
                time:this.formateDate(new Date()).substr(0,7)
            }
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        created(){
            let data={
                userId:this.userId,
                searchType:0,
                startTime:this.startime,
                endTime:this.endtime,
                pageIndex:1,
                pageSize:1000,
            }
            this.getBillDetail(data);
        },
        methods:{
            selectTime(time){
                if(!this.selectIndex){
                    this.startime=this.formateDate(time);
                }else{
                    this.endtime=this.formateDate(time);
                }
                this.showTime=false;
            },
            selectClick(index){
                this.selectIndex=index;
                this.showTime=true;
            },
            formateDate(time){
                let y= time.getFullYear();
                let m=time.getMonth()+1+'';
                let d=time.getDate()+'';
                if(m<10){
                    m='0'+m;
                }
                if(d<10){
                    d='0'+d
                }
                return y+'/'+m+'/'+d;
            },
            //上个月
            afterM(time){
                let y= time.getFullYear();
                let m=time.getMonth();
                let d=time.getDate();
                if(m<10){
                    m='0'+m;
                }
                if(d<10){
                    d='0'+d
                }
                return y+'/'+m+'/'+d;
            },
            //最近一年
            afterY(time){
                let y= time.getFullYear();
                let m=time.getMonth()+1;
                let d=time.getDate();
                if(m<10){
                    m='0'+m;
                }
                if(d<10){
                    d='0'+d
                }
                return (y-1)+'/'+m+'/'+(d-1)+' - '+y+'/'+m+'/'+d;
            },
            //今年
            nowY(time){
                let y= time.getFullYear();
                let m=time.getMonth();
                let d=time.getDate();
                if(m<10){
                    m='0'+m;
                }
                if(d<10){
                    d='0'+d
                }
                return y+'/01/01'+' - '+y+'/'+m+'/'+d;
            },
            //获取详情
            getBillDetail(data){
                getBill(data).then(res=>{
                    if(res.Success){
                        this.detail=res.Data;
                    }
                })
            },
            //时间类型查询
            searchClick(index){
                this.currentIndex=index;
                this.getBillDetail({
                    userId:this.userId,
                    searchType:index+1,
                    startTime:'',
                    endTime:'',
                    pageIndex:1,
                    pageSize:1000,
                })
                if(index==0){
                    this.time=this.formateDate(new Date()).substr(0,7)
                }else if(index==1){
                    this.time=this.afterM(new Date()).substr(0,7)
                }else if(index==2){
                    this.time=this.nowY(new Date())
                }else{
                    this.time=this.afterY(new Date())
                }
                this.show=false;
            },
            //其它时间查询
            timeClick(){
                this.getBillDetail({
                    userId:this.userId,
                    searchType:0,
                    startTime:this.startime,
                    endTime:this.endtime,
                    pageIndex:1,
                    pageSize:1000,
                })
                this.time=this.startime+' - '+this.endtime;
                this.show=false;
            }

        }
    }
</script>

<style scoped>
    .top{
        height:85px;
        background:#F6F6F6;
        font-size:16px;
        padding:16px;
        box-sizing: border-box;
        color:#999;
    }
    .top>p{
        color:#333;
       margin-bottom:18px;
    }
    .list ul li{
        display: flex;
        font-size:16px;
        padding:24px 16px 0 16px;
    }
    .list ul li>p{
        width:15%;

    }
    .list ul li img{
        width:42px;
        height:42px;
        border-radius:50%;
    }
    .list ul li>div{
        width:85%;
        border-bottom:1px solid #E7E7E7;
        padding-bottom:24px;
    }
    .list ul li h2{
        font-size:16px;
    }
    .list ul li h2 span{
        float:right;
        font-size:18px;
    }
    .list ul li>div>p{
        margin:10px 0;
        color:#999;
    }
    .select_box{
        padding:16px;
        font-size:16px;
    }
    .select_box>div>p{
        font-weight:700;
        color:#333;
        line-height:45px;
    }
    .select_box>div ul{
        display: flex;
        justify-content: space-around;
    }
    .select_box>div ul li{
        width:72px;
        height:30px;
        text-align:center;
        line-height:30px;
        color:#FF7EA3;
        border:1px solid #ddd;
    }
    .select_box>div ul li.active{
        background:#FF7EA3;
        color:#fff;
    }
    .custom_box{
        display: flex;
    }
    .custom_box>p{
        display: flex;
        font-size:14px;
        padding:4px 10px;
        border:1px solid #ddd;
        border-radius:3px;
    }
    .custom_box>p:first-child{
        margin-right:10px;
    }
    .custom_box>p:nth-child(2){
        margin-left:10px;
        margin-right:15px;
    }
    .custom_box>p i{
        color:#000;
        margin-left:3px;
    }
</style>