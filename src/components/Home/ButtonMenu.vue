<template>
    <div class="menu-button">
        <button
          @click.prevent="action ? action() : target ? $router.push(target) : null" 
          :style="color ? `color: ${color};` : 'color: default;'">
            {{ text }}
        </button>
    </div>
</template>

<script>
export default {
  props: {
    text: String,
    target: String,
    color: String,
    action: Function
  }
}
</script>

<style scoped lang="scss">
  .menu-button {
    display: block;
    margin: 10px 15px;

    > button {
        width: 170px;
        color: white;
        padding: 8px 10px;
        font-weight: bold;
        border-radius: 15px;
        display: inline-block;
        text-decoration: none;
        border: 1px solid $blue-color;
        background-color: transparent;
    }
    > button:hover {
        border: 1px solid white;
        background-color: $blue-color;
    }
  }
</style>
