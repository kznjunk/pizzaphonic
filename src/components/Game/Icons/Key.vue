<template>
    <div class="play-keys">
        <router-link
            v-for="secret in secrets" :key="secret"
            :to="(secret && secret.target) || ''"
            :class="secret && secret.target ? '' : 'locked'"
        >
            <img
                src="@/assets/key.png"
                alt="secret"
                rel="preload"
            />
        </router-link>
        </div>
</template>

<script>
export default {
  props: {
    secrets: Array
  }
}
</script>

<style scoped lang="scss">
.play-keys {
    top: 70px;
    position: absolute;
}
a {
    padding: 5px;
    margin: 0px 5px;
    position: relative;
    img {
        width: 30px;
    }
}
a.locked img {
    -webkit-filter: blur(0px) grayscale(95%);
    -moz-filter: blur(0px) grayscale(95%);
    -o-filter: blur(0px) grayscale(95%);
    -ms-filter: blur(0px) grayscale(95%);
    filter: blur(0px) grayscale(95%);
}
a::before {
    content: "";
    display: block;
    box-shadow: inset 0 0 5px white;
    border-radius: 50px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
