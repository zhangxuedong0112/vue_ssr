<!-- App.vue -->
<template>
      <div class="pre">
            <div class="header">
                  <h2>欢迎来到SSR渲染页面</h2>
                  <router-link to="/home">home</router-link>
                  <router-link to="/animal">animal</router-link>
                  <router-link to="/people">people</router-link>
            </div>

            <div class="body">
                  <router-view></router-view>
            </div>
            
            <div class="footer">

            </div>
      </div>
</template>


<script>
export default {
      mounted() {

      }
}
</script>


<style lang="less">
@import './lib/css/base.less';
@hreader_background: green;

.header{
      height: 50px;
      width: 100%;
      background: @hreader_background;
}

.body{
      min-height: calc(100% - 100px);
      width: 100%;
      background: #dddddd;
}

.footer{
      height: 50px;
      width: 100%;
      background: @hreader_background;
}
</style>
