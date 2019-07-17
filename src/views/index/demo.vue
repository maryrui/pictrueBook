<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "demo",
        data(){
            return {


            }
        },
        created(){
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
        }
    }
</script>

<style scoped>

</style>