<template >
    <div class="lightbox">
      <h2 v-if="lightbox.title" >{{ lightbox.title }}</h2>
      <img v-if="lightbox.image" :src="lightbox.image" alt="" />
      <p v-if="lightbox.content">{{ lightbox.content }}</p>
      <button v-if="true">Go back</button>
    </div>
</template>

<script>
export default {
  props: {
    lightbox: Object
  }
}
</script>

<style scoped lang="scss">
.lightbox {
    z-index: 4;
    max-width: 400px;
    padding: 10px 20px;
}
</style>
