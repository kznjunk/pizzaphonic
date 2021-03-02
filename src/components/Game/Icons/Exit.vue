<template>
    <router-link :to="target">
        ✕
    </router-link>
</template>

<script>
export default {
  props: {
    target: String
  }
}
</script>

<style scoped lang="scss">
a {
    color: white !important;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
    font-size: 20px;
    border-radius: 50px;
    text-decoration: none !important;
    border: 1px solid white;
}
</style>
