<template>
    <img
        v-bind:class="{ 'animatedLive': isAlive, 'animatedFall': !isAlive }"
        :src="require(isAlive ? '@/assets/nyan.gif' : '@/assets/nyan-d.png')"
        alt=""
        @click="explode()"
        v-bind:style="{ left: left + 'px', top: top + 'px' }"
    />
</template>

<script>
export default {
  props: {
    target: String
  },
  data() {
    return {
      top: 200,
      left: -50,
      isAlive: true
    }
  },
  created() {
      const winHeightWfooter = window.innerHeight - 100
      this.top = this.getRandomInt(winHeightWfooter)

      document.addEventListener('click, touch', this.explose)

      window.setTimeout(() => {
          this.byeBye()
      }, 10000)
  },
  methods: {
    explode () {
        this.isAlive = false
        this.left = this.$el.offsetLeft
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * max)
    },
    byeBye () {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style scoped lang="scss">
img {
  width: 50px;
  position: absolute;
}    
img.animatedLive {
  -webkit-animation: linear 1 alternate;
  -webkit-animation-name: nyan-nyan;
  -webkit-animation-duration: 10s;
}
img.animatedFall {
  -webkit-animation: linear 1 alternate;
  -webkit-animation-name: nyan-nyan-fall;
  -webkit-animation-duration: 10s;
} 
@-webkit-keyframes nyan-nyan {
  0% {
    left: 0%;
  }
  100% {
    left: 100%;
  }
}
@-webkit-keyframes nyan-nyan-fall {
    0% {
        -webkit-transform: translateY(0px);
    }
    10% {
        -webkit-transform: translateY(0px);
    }
    100% {
        -webkit-transform: translateY(4000px);
    }
}
</style>
