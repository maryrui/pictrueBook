<template>
    <div class="sale_box">
        <div class="sale_top">
            <p>{{isSale ? userInfo.EstimateIntegral : userInfo.Integral}}</p>
            <span>{{isSale ? '预估积分' : '可用积分'}}</span>
        </div>
        <p class="time_select" @click="timeShow=true" v-if="!isSale">
            {{currentDate.getFullYear()+'年'+(currentDate.getMonth()+1)+'月'}} <van-icon name="arrow-down" />
        </p>
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <p><img :src="item.ImagePath" alt=""></p>
                <div>
                    <p>{{isSale ? item.NickName : item.Name}}</p>
                    <span>{{isSale ? item.Remark : item.Explain}}</span>
                </div>
                <div>
                    <span>{{!isSale&& item.IntegralType==2 ? '-' : '+'  }}{{isSale ? item.Integral : item.Amount }}</span>
                    <p>{{item.CreateTime.split('-')[1]+'月'+item.CreateTime.split('-')[2]}}</p>
                </div>
            </li>
        </ul>
        <van-popup v-model="timeShow" position="bottom" :overlay="true">
            <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    @confirm="changeTime"
                    @cancel="timeShow=false"
                    :formatter="formatter"
            />
        </van-popup>
    </div>
</template>

<script>
    import {getSaleList} from '@/api/sale'
    import {mapGetters} from 'vuex'
    export default {
        name: "index",
        props:{
            list:{
                type:Array,
                default:[]
            },
            isSale:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                currentDate: new Date(),
                timeShow:false,
                num:0
            }
        },
        computed:{
            ...mapGetters([
                'userInfo'
            ])
        },
        methods: {
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
            changeTime(item){
                this.timeShow=false;
                this.$emit('selectTimeClick',item)
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