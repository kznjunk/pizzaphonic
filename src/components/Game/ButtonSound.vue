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
        :data-soundFileName="sound.soundFileName"
      >
        <img v-if="sound.imgUrl" :src="sound.imgUrl" alt=""/>
        {{ sound.level}}
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/components/EventBus";

export default {
  props: {
    sounds: Array
  },
  data() {
    return {
      currentRound: 1
    }
  },
  created () {
    EventBus.$on('roundChanged', ({ wayToGo, currentRound }) => {
      this.currentRound = currentRound
    })
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
  border: 2px solid rgba(43, 116, 199, 1);
  -webkit-filter: blur(0.5px);
  -moz-filter: blur(0.5px);
  -o-filter: blur(0.5px);
  -ms-filter: blur(0.5px);
  filter: blur(1px);

  img {
    width: 100%;
  }
}
.pizza.easy {
  width: 90px;
  height: 90px;
}
.pizza.medium {
  width: 70px;
  height: 70px;
}
.pizza.hard {
  width: 50px;
  height: 50px;
}
.pizza:hover {
  border: 2px solid rgb(30, 30, 30);
  background-color: rgba(43, 116, 199, 0.6);
  -webkit-filter: blur(0.2px);
  -moz-filter: blur(0.2px);
  -o-filter: blur(0.2px);
  -ms-filter: blur(0.2px);
  filter: blur(0.5px);
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
