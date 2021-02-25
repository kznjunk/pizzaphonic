<template>
  <div class="progress-bar" :style="cssProps">
    <div v-bind:style="{ width: toValue + '%' }"></div>
  </div>
</template>

<script>
export default {
  props: {
    fromValue: Number,
    toValue: Number
  },
  computed: {
    cssProps() {
      return {
        '--from-progress-bar': (this.fromValue) + "%",
        '--to-progress-bar': (this.toValue) + "%"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  background-color: blue;

  div {
    height: 20px;
    background-color: $red-color;
    transition-delay: 0s;
    transition-duration: 1s;
    transition-property: width;
    transition-timing-function: ease-in-out;
  }
}
</style>


