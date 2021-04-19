<template>
  <div class="lifes" v-bind:class="{ 'shake-shake': shouldShake }">
    <img
      v-for="i in maxLife" :key="i"
      :src="require(userLife >= i ? '@/assets/lifeY.png' : '@/assets/lifeN.png')"
      alt="life"
      rel="preload"
    />
  </div>
</template>

<script>
export default {
  props: {
    userLife: Number
  },
  data() {
    return {
      maxLife: 5,
      shouldShake: false
    }
  },
  watch: {
    'userLife': function(val, oldVal) {
        this.shouldShake = true

        window.setTimeout(() => {
            this.shouldShake = false
        }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
.lifes {
    align-items: center;
    display: inline-flex;
    justify-content: center;
}
img {
    width: 30px;
    margin: 0px 3px;
}
img:nth-child(2),
img:nth-child(4) {
    position: absolute;
}
img:nth-child(1) {
    z-index: 9;
    margin-top: 13px;
}
img:nth-child(2) {
    z-index: 8;
    margin-top: -8px;
    margin-left: -35px;
}
img:nth-child(3) {
    z-index: 7;
    margin-top: 12px;
}
img:nth-child(4) {
    z-index: 6;
    margin-top: -8px;
    margin-left: 40px;
}
img:nth-child(5) {
    z-index: 5;
    margin-top: 12px;
}
@media screen and (max-width: 1000px) {
    img {
        width: 20px;
        margin: 0px 3px;
    }
    img:nth-child(1) {
    }
    img:nth-child(2) {
    margin-left: -24px;
    }
    img:nth-child(3) {
    }
    img:nth-child(4) {
    margin-left: 29px;
    }
    img:nth-child(5) {
    }
}

.lifes.shake-shake {
  animation: shake 1s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, -1px, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 2px, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, -2px, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 2px, 0);
  }
}
</style>
