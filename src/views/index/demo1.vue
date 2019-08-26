<template>
    <div>
        <ul>
            <li v-for="(item,index) in list" :key="index">{{index}}{{item}}</li>
        </ul>
        <button @click="btnClick">点击</button>
    </div>
</template>

<script>
    export default {
        name: "demo1",
        data(){
            return {
                list:[],
            }
        },
        methods:{
            btnClick(){
                this.list.push('这是一条数据')
            }
        }
    }
</script>

<style scoped>

</style>