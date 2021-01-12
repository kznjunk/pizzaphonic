<template>
  <div class="menus">
    <MenusHeader />
    <div class="menu-content">
        <router-view />
    </div>
  </div>
</template>

<script>
import MenusHeader from '@/components/Banners/MenusHeader.vue'

export default {
  components: {
    MenusHeader
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
