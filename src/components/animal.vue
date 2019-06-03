<template>
      <div>
            animal
            <input v-model="demo"/>
            <span>{{demo}}</span>
      </div>
</template>


<script>
export default {
    data(){
        return{
              demo: ""
        }
    },
    mounted() {

    }
}
</script>


<style scoped>

</style>