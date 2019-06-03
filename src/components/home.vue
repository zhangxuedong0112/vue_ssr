<!-- home.vue -->
<template>
  <div>
    home
    <span>{{ homeInfo }}</span>
    <el-button type="danger" @click="clickbtn">危险按钮</el-button>
</div>
</template>


<script>

export default {
    serverRequest(store) {
        return store.dispatch('getHomeInfo')
    },
    created(){
        

        if (typeof window !== 'undefined') {
            // if(!this.$store.state.homeInfo.title){
            //     this.$store.dispatch('getHomeInfo')
            // }
            
            window.localStorage.setItem("a",1)
            console.log("home created")
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            console.log("home mounted",window.localStorage.getItem("a"))
        }
    },
    updated(){
        console.log("home updated")
    },
    destroyed(){
        console.log("home destroyed")
    },
    computed: {
        homeInfo() {
            return this.$store.state.homeInfo
        }
    },
    methods:{
        clickbtn(){
            alert("click")
        }
    }
}
</script>


<style lang="less" scoped>
@font_bg: red;
div{
    span{
        color: @font_bg;
    }
}
</style>
