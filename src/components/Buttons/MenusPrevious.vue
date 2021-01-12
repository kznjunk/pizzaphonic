<template>
    <router-link :to="target">
        <img src="https://spaghettai.s3.eu-west-3.amazonaws.com/icons/arrow-left.png" alt="previous" rel="preload"/>
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
}
img {
    width: 30px;
}
</style>
