<template>
  <div class="menus">
    <Header />

    <div class="menu-content">
        <router-view />
    </div>
  </div>
</template>


<script>
import Header from '@/components/Home/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
.menus {
    height: 100%;
}
.menu-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
