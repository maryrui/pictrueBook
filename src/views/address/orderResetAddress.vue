<template>
    <div class="address_box">
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                @select="selectAddress"
                @add="onAdd"
                @edit="onEdit"
        />
    </div>
</template>

<script>
    import {getAddressList} from '@/api/user'
    import {setOrderAddress} from '@/api/order'
    import {mapGetters} from 'vuex'
    export default {
        name: "orderResetAddress",
        data() {
            return {
                chosenAddressId: 1,
                list: [],
                code:'',
            }
        },
        created(){
            this.code=this.$route.params.code;
            this.getAddresslist();
        },
        methods: {
            //添加按钮
            onAdd() {
                this.$router.push('/addAddress/');
            },
            //编辑按钮
            onEdit(item) {
                this.$router.push('/editAddress/'+item.id);
            },
            //获取列表
            getAddresslist(){
                getAddressList({'userId':this.userId}).then(res=>{
                    if(res.Success){
                        let data=res.Data;
                        data.forEach((item)=>{
                            this.list.push(
                                {
                                    id: item.Id,
                                    name: item.Name,
                                    tel: item.Phone,
                                    address:item.AreaStr+item.DetailAddress
                                }
                            )
                        })
                    }
                })
            },
            //选择地址
            selectAddress(item,index){
                setOrderAddress({
                    "OrderNumber": this.code,
                    "UserId": this.userId,
                    "Address": item.address,
                    "Phone": item.tel,
                    "Name": item.name
                }).then(res=>{
                    if(res.Success){
                        this.$toast('修改成功');
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
    .address_box button{
        background:#FF7EA3;
        border:0;
    }
</style>