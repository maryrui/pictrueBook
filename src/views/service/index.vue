<template>
    <div class="service_box">
        <div>
            <img src="../../../static/images/wechat.png" alt="">
        </div>
        <p>联系电话：13751154869</p>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .service_box{
        font-size:12px;
        width:300px;
        height:120px;
        text-align:center;
        position: absolute;
        top:30%;
        left:50%;
        font-weight:700;
        transform: translate(-50%,-50%);
    }
    .service_box img{
        margin-bottom:20px;
        width:120px;
        height:120px;
    }
</style>