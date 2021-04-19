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
  color: white;
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
.suchWow a {
  animation: noiceColor .5s linear 0s infinite, noiceBorderColor .5s linear 0s infinite;
}
</style>
