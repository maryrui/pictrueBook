<template>
    <div class="detail_box">
        <van-address-edit
            :area-list="areaList"
            show-postal
            :show-delete='isEdit'
            :address-info="address"
            show-search-result
            show-set-default
            @save="onSave"
            @delete="onDelete"
        />

    </div>
</template>

<script>
    import areaList from '@/utils/address'
    import {setAddress,getAddress,delAddress} from '@/api/user'
    import {mapGetters} from 'vuex'
    export default {
        name: "detail",
        data() {
            return {
                areaList,
                searchResult: [],
                id:0,
                address:{
                    addressDetail: '',
                    areaCode: '',
                    city: '',
                    country: "",
                    county: "",
                    name: " ",
                    postalCode: "",
                    province: "",
                    tel: "",
                }
            }
        },
        props:{
            isEdit:{
                type:Boolean,
                default:false
            }
        },
        created(){
            if(this.isEdit){
                this.id=this.$route.params.id;
                this.getAddressDetail();
            }
        },
        methods: {
            //点击提交
            onSave(content) {
                var data={
                    "Id":this.id,
                    "IsDefault":content.isDefault ? 1 : 0,
                    "Name": content.name,
                    "Phone":content.tel,
                    "AreaStr": content.province+content.city+content.county,
                    "DetailAddress": content.addressDetail,
                    "UserId": this.userId,
                    "AreaCode": content.areaCode,
                    "ZipCode": content.postalCode
                }
                setAddress(data).then(res=>{
                    if(res.Success){
                        this.$router.go(-1)
                    }
                })
            },
            //删除地址
            onDelete() {
                delAddress({id:this.id,userId:this.userId}).then(res=>{
                    if(res.Success){
                        this.$router.go(-1)
                    }
                })
            },
            //获取单个地址详情
            getAddressDetail(){
                getAddress({id:this.id}).then(res=>{
                    if(res.Success){
                        this.address.addressDetail=res.Data.DetailAddress;
                        this.address.tel=res.Data.Phone;
                        this.address.name=res.Data.Name;
                        this.address.isDefault=res.Data.IsDefault ? true : false;
                        this.address.postalCode=res.Data.ZipCode
                        this.address.areaCode=res.Data.AreaCode
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

<style>
    .detail_box{
        position:absolute;
        top:0;
        left:0;
        height:100%;
        width:100%;
        background:#F3F4F6;
    }
    .detail_box .van-address-edit__buttons button.van-button{
        background:#07c160;
        border:0;
    }
    .detail_box .van-address-edit__buttons button.van-button:last-child{
        background:#ff5044;
        color:#fff;
    }
</style>