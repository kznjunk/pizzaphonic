<template>
  <div class="loading">
    <h2 v-if="loading.title" class="font-akaya">{{ loading.title }}</h2>
    <div v-if="!loading.ready">
        {{ wipMessage }}<span class="loading-dot1">.</span>
        <span class="loading-dot2">.</span>
        <span class="loading-dot3">.</span>
    </div>
    <div v-else class="loading-dot2">
        - {{ play.loading.done }} -
    </div>
    <div class="progress-bar">
      <div v-bind:style="{ width: loading.current + '%' }"></div>
    </div>
    <p>{{ play.loading.tips[tipIndex] }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    loading: Object
  },
  data: function(){
    return {
      index: null,
      wipMessage: '',
    }
  },
  created() {
    this.tipIndex = Math.floor(Math.random() * this.play.loading.tips.length)
    this.wipMessage = this.play.loading.wip.replace('{{x}}', this.loading.unlockedRound)
  },
  computed: {
    ...mapState({
      play: state => state.play
    })
  }
}
</script>

<style scoped lang="scss">
.loading {
  z-index: 6;
  max-width: 400px;
  padding: 10px 20px;
}

.loading-dot1 {
  animation: loading-dot1 1s linear infinite;
}
.loading-dot2 {
  animation: loading-dot2 1s linear infinite;
}
.loading-dot3 {
  animation: loading-dot3 1s linear infinite;
}
@keyframes loading-dot1 {
  25% {
    opacity: 0;
  }
}
@keyframes loading-dot2 {
  50% {
    opacity: 0;
  }
}
@keyframes loading-dot3 {
  75% {
    opacity: 0;
  }
}

.progress-bar {
  width: 200px;
  margin: 10px auto 40px;
  background-color: black;
  border-radius: 3px;
  border: 1px solid white;

  div {
    height: 20px;
    background-color: $red-color;
    transition-delay: 0s;
    transition-duration: 1s;
    transition-property: width;
    transition-timing-function: ease-in-out;

    background-repeat: repeat;
    background-position: center center;
    background-image: url('~@/assets/loading_bg.png');
  }
}
</style>
