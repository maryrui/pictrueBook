<template>
    <div class="name_box">
        <div>
            <label>昵称</label>
            <input type="text" v-model="name">
        </div>
        <p>
            <van-button type="danger" size="large" @click="saveClick">保存</van-button>
        </p>
    </div>
</template>

<script>
    export default {
        name: "NameDetail",
        data(){
            return {
                name:""
            }
        },
        created(){
            this.name=sessionStorage.getItem('name')
        },
        methods:{
            //保存按钮
            saveClick(){
                if(this.name!==sessionStorage.getItem('name')){
                    sessionStorage.setItem('name',this.name)
                }
                this.$router.push('/self')
            }
        }
    }
</script>

<style scoped>
    .name_box{
        font-size:15px;
        color:#333;
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: #F3F4F6;
    }
    .name_box>div{
        background:#fff;
        margin-top:8px;
        padding:22px 16px;
    }
    .name_box input{
        width:80%;
        border:0;
        color:#999;
        padding-left:15px;
    }
    .name_box>p{
        margin-top:40px;
        padding:0 16px;
    }
</style>