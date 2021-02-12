<template>
    <div class="round-content">
        <button @click="changeRound('prev')"><</button>
        <span
            v-for="(round, index) in rounds"
            class="round-name"
            v-bind:class="{ 'active': currRound === index + 1 }"
            :data-round="index + 1"
        >
            {{ index + 1 }}. {{ round.name }}
        </span>
        <button @click="changeRound('next')">></button>
    </div>
</template>

<script>
import EventBus from "@/components/EventBus";

export default {
  props: {
    target: String,
    rounds: Array
  },
  data() {
    return {
      currRound: 1
    }
  },
  created() {
    document.addEventListener('keyup', this.doCommand)
  },
  destroyed() {
    document.removeEventListener('keyup', this.doCommand)
  },
  methods: {
    changeRound (wayToGo) {
        const isPrev = wayToGo === 'prev'
        const isNext = wayToGo === 'next'
        const isValidWay = (isPrev && this.currRound > 1) || (isNext && this.currRound < this.rounds.length)

        if (isValidWay) {
            isPrev ? this.currRound-- : this.currRound++
            EventBus.$emit('roundChanged', { wayToGo, currRound: this.currRound })
        }
    },
    doCommand(e) {
        const currTarget = e.target
        const key = e.keyCode || e.charCode
        const isLeft = key == 37
        const isRight = key == 39

        if (isLeft) {
            this.changeRound('prev')
        } else if (isRight) {
            this.changeRound('next')
        }
    }
  }
}
</script>

<style scoped lang="scss">
.round-content button {
    color: white;
    border: none;
    cursor: pointer;
    background-color: transparent;
}

.round-name {
    display: none;
    margin: 0px 30px;
    // font-family:
}
.round-name.active {
    display: inline-block;
}
.next-arrow,
.previous-arrow {
    padding: 10px;
}
@media screen and (max-width: 1000px) {
    .round-name {
        margin: 0px 15px;
    }
}
</style>
