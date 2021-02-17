<template >
    <div class="lightbox">
      <div class="overlay"></div>
      <div class="lightbox-content">
        <h2 v-if="title" >{{ title }}</h2>
        <img v-if="image" :src="image" alt="" />
        <p v-if="content">{{ content }}</p>
        <button v-if="true">Go back</button>
    </div>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    image: String,
    content: String,
    isButtonEnable: Boolean
  }
}
</script>

<style scoped lang="scss">
.lightbox {
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    .overlay {
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .lightbox-content {
        z-index: 2;
    }
}
</style>
