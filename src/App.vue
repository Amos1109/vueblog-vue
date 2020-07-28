<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  watch: {
    // '$route'(to, from) {
    //   console.log(to)
    //   this.$router.go(0);
    // }
    '$route.path': function (newVal, oldVal) {
      if (newVal === '/blogs' && oldVal==="/login") {
        this.$router.go(0);
      }
    }
  }
}
</script>

<style>
#app{
  max-width: 960px;
  margin: 0 auto;
}
</style>
