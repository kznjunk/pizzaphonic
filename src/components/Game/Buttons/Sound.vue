<template>
  <div class="pizzas">
    <div
      v-for="(soundsRound, i) in sounds"
      :data-round="i + 1"
      v-bind:class="{ 'active': currentRound === i + 1 }"
    >
      <div
        v-for="(sound, j) in soundsRound"
        :class="`pizza ${sound.level}`"
        :data-id="sound.id"
        @click="playSound(i + 1, sound.soundFileName)"
      >
        <img v-if="sound.imgUrl" :src="sound.imgUrl" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/components/EventBus'
import { getSound } from '@/helpers'

export default {
  props: {
    sounds: Array,
    rounds: Array
  },
  data() {
    return {
      currentRound: 1,
      currentPlayableSound: null
    }
  },
  created () {
    EventBus.$on('roundChanged', ({ wayToGo, currentRound }) => {
      this.currentRound = currentRound
    })
  },
  methods: {
    playSound (roundId, fileName) {
      const folderName = `${roundId}-${this.rounds[roundId - 1]['folderName']}`
      const soundUrl = getSound(folderName, fileName)

      if (this.currentPlayableSound) this.currentPlayableSound.pause()
      this.currentPlayableSound = new Audio(soundUrl)
      this.currentPlayableSound.play()
    }
  }
}
</script>

<style scoped lang="scss">
.pizzas > div {
  display: none;
}
.pizzas > div.active {
  display: inline-block;
}

.pizza {
  display: inline-block;
  border: 1px solid rgba(51, 153, 255, 0.4);
  background-color: rgba(51, 153, 255, 0.2);
  margin: 15px;
  position: relative;
  border-radius: 50px;
  align-items: center;
  display: inline-flex;
  justify-content: center;

  cursor: pointer;
  background-color: rgba(28, 28, 28, 0.9);
  filter: blur(0px);

  img {
    width: 100%;
    height: 100%;
    position: fixed;
    border-radius: 50px;
  }
}
.pizza:hover {
  border: 2px solid rgb(30, 30, 30);
  background-color: rgba(43, 116, 199, 0.6);
}
.pizza.easy {
  width: 90px;
  height: 90px;
  border: 2px solid $green-color;
}
.pizza.medium {
  width: 70px;
  height: 70px;
  border: 2px solid $blue-color;
}
.pizza.hard {
  width: 50px;
  height: 50px;
  border: 2px solid $red-color;
}

@media screen and (max-width: 1000px) {
  .pizza {
    margin: 10px;
  }
  .pizza.easy {
    width: 70px;
    height: 70px;
  }
  .pizza.medium {
    width: 50px;
    height: 50px;
  }
  .pizza.hard {
    width: 30px;
    height: 30px;
  }
}
</style>
