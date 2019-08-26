<template>
    <div class="service_box">
        <div>
            <a href="tel:13410474329" class="phone">
                <img src="../../../static/images/wechat.png" alt="">
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .service_box{
        position: fixed;
        width:100%;
        height:100%;
    }
    .service_box div{
        width:100%;
       /* position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);*/
    }
    .service_box div img{
        width:100%;
    }
</style>