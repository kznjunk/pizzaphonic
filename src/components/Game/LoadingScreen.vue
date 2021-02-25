<template >
    <div
        class="loading-screen"
        v-bind:class="{ 'hide-loading-screen': !loading.enable }"
    >
      <div class="overlay"></div>
      <div class="content">
            <img alt="Pizzaphonic" src="@/assets/pp-only.png" />
            <p>{{ title }}</p>
            <ProgressBar
                :fromValue="fromProgressBar"
                :toValue="loading.current"
            />
            <p>Loading...</p>
      </div>
    </div>
</template>

<script>
import ProgressBar from "@/components/Game/ProgressBar.vue"

export default {
  components: {
    ProgressBar
  },
  props: {
      loading: Object,
      title: String
  },
  data() {
    return {
      fromProgressBar: 0,
      toProgressBar: 60
    }
  }
}
</script>

<style scoped lang="scss">
.loading-screen {
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
        background-color: rgba(0, 0, 0, 0.8);
    }
    .content {
        z-index: 6;
        img {
            height: 40px;
            // -webkit-animation: pizzapizza 0.1s ease-in-out infinite;
            // -moz-animation: pizzapizza 0.1s ease-in-out infinite;
            // animation: pizzapizza 0.1s ease-in-out infinite;
        }
    }
}
.hide-loading-screen {
    -webkit-animation: hide 1s linear;
    -moz-animation: hide 1s linear;
    animation: hide 1s linear;
    -webkit-animation-fill-mode: forwards;
}
@keyframes pizzapizza {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
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
