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
    '$route'(to, from) {
      this.$router.go(0);
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
