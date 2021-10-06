<template>
  <div class="show-blogs">
    <h3>博客总览</h3>
    <div class="single-blog"></div>
  </div>
</template>

<script>
export default {
    name:'blogs',
    data() {
        return {
            blogs:[]
        }
    },
    created() {
        // this.$http.get('https://jsonplaceholder.typicode.com/post')
        //     .then(function(data){
        //         console.log(data)
        //     })
    },
}
</script>

<style  scoped>

</style>