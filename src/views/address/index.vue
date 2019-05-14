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
    import {mapGetters} from 'vuex'
    export default {
        name: "index",
        data() {
            return {
                chosenAddressId: '1',
                list: []
            }
        },
        created(){
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
                        if(this.$route.params.id>1){
                            this.chosenAddressId=''+this.$route.params.id;
                        }else{
                            this.chosenAddressId= ''+res.Data[0].Id;
                        }
                        data.forEach((item)=>{
                            this.list.push(
                                {
                                    id: item.Id+'',
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
                localStorage.setItem('addressIndex',index);
                this.$router.go(-1)
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