<template>
    <address-detail :isEdit="true"></address-detail>
</template>

<script>
    import addressDetail from './components/detail'
    export default {
        name: "edit",
        components:{
            addressDetail
        }
    }
</script>

<style scoped>

</style>