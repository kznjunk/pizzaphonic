<template>
    <div class="menu-button">
        <router-link :to="target" :style="color ? `color: ${color};` : 'color: default;'">
            {{ text }}
        </router-link>
    </div>
</template>

<script>
export default {
  props: {
    text: String,
    target: String,
    color: String
  }
}
</script>

<style scoped lang="scss">
  .menu-button {
    display: block;
    margin: 10px 15px;

    > a {
        width: 150px;
        color: white;
        padding: 5px 10px;
        font-weight: bold;
        border-radius: 15px;
        display: inline-block;
        text-decoration: none;
        border: 1px solid $blue-color;
    }
    > a:hover {
        border: 1px solid white;
        background-color: $blue-color;
    }
  }
</style>
