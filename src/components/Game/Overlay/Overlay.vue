<template>
    <div
        class="bonjour"
        v-bind:class="{
            'hide-bonjour': !loading.enable && !lightbox.enable,
            'opaque-bg': loading.isFirst
        }"
    >
        <div class="overlay"></div>
        <Loading
            v-if="loading.enable"
            :loading="loading"
        />
        <Lightbox
            v-else
            :lightbox="lightbox"
        />
    </div>
</template>

<script>
import Loading from '@/components/Game/Overlay/Loading.vue'
import Lightbox from '@/components/Game/Overlay/Lightbox.vue'

export default {
  components: {
    Loading,
    Lightbox
  },
  props: {
    loading: Object,
    lightbox: Object
  }
}
</script>

<style scoped lang="scss">
.bonjour.opaque-bg {
    background-color: black;
}
.bonjour {
    visibility: visible;
    z-index: 5;
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
        background-color: rgba(0, 0, 0, 0.9);
    }
}

.hide-bonjour {
    -webkit-animation: hide 1s linear;
    -moz-animation: hide 1s linear;
    animation: hide 1s linear;
    -webkit-animation-fill-mode: forwards;
}
@keyframes hide {
  0% {
    opacity: 1;
  }
  100% {
    z-index: -1;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
