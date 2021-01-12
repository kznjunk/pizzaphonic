<template>
  <div id="app">
    <div id="app-content">
      <router-view />
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Banners/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>

<style lang="scss">
#app,
#app-content {
  height: 100%;
}

#app {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
</style>
