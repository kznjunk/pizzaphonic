<template>
    <div class="game-background">
      <div class="game-background-img"></div>
      <div id="test" class="game-nyan">
        <component
          v-for="(nyan, index) in nyans"
          :key="index"
          :is="nyan"
        />
      </div>
    </div>
</template>

<script>
import EventBus from '@/components/EventBus'
import Nyan from "@/components/Game/Icons/Nyan.vue"

export default {
  components: {
    Nyan
  },
  props: {
    nyan: Boolean
  },
  data: function(){
    return {
  	  nyans: [ ]
    }
  },  
  created () {
    EventBus.$on('party-hard', () => {
      this.partyHard()
    })
  },
  methods: {
    partyHard () {
      window.setTimeout(() => {
        this.nyans.push(Nyan)
        this.partyHard()
      }, 3000)
    }
  }
}
</script>

<style scoped lang="scss">
.game-nyan,
.game-background,
.game-background-img {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
.game-background-img {
  background-color: #101012;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-image: url('~@/assets/bgggm.png');

  background-size: cover;
  animation-name: backgroundAnimation;
  animation-duration: 6s;
  -webkit-filter: blur(0px) grayscale(95%) brightness(50%);
  -moz-filter: blur(0px) grayscale(95%) brightness(50%);
  -o-filter: blur(0px) grayscale(95%) brightness(50%);
  -ms-filter: blur(0px) grayscale(95%) brightness(50%);
  filter: blur(0px) grayscale(95%) brightness(50%);
}
@media screen and (min-width: 681px) {
  .game-background-img {
    background-image: url('~@/assets/bggg.jpg');
  }
}
</style>
