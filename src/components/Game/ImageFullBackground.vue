<template>
    <div class="game-background"></div>
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
.game-background {
  background-color: #101012;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-image: url('~@/assets/bg.jpg');
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  animation-name: backgroundAnimation;
  animation-duration: 6s;
  -webkit-filter: blur(0px) grayscale(95%);
  -moz-filter: blur(0px) grayscale(95%);
  -o-filter: blur(0px) grayscale(95%);
  -ms-filter: blur(0px) grayscale(95%);
  filter: blur(0px) grayscale(95%);
}
</style>
