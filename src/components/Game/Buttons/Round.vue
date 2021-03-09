<template>
    <div class="round-content" :data-current-round="currentRound">
        <button
            v-bind:class="{ 'casper': currentRound < 2 }"
            @click="changeRound('prev')"
        >
            <img src="@/assets/next.png" alt="next" class="arrow arrow-prev"/>
        </button>
        <span
            v-for="(round, index) in rounds"
            class="round-name font-akaya"
            v-bind:class="{ 'active': currentRound === index + 1 }"
            :data-round="index + 1"
        >
            {{ index + 1 }}. {{ round.name }}
        </span>
        <button
            v-bind:class="{ 'blink-blink': highlightNewRound, 'casper': !this.rounds[this.currentRound] }"
            @click="changeRound('next')"
        >
            <img src="@/assets/next.png" alt="next" class="arrow arrow-next"/>
        </button>
    </div>
</template>

<script>
import EventBus from "@/components/EventBus";

export default {
  props: {
    rounds: Array,
    highlightNewRound: Boolean
  },
  data() {
    return {
      currentRound: 1
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
        const isValidWay = (isPrev && this.currentRound > 1) || (isNext && this.currentRound < this.rounds.length)

        if (isValidWay) {
            isPrev ? this.currentRound-- : this.currentRound++
            EventBus.$emit('roundChanged', { wayToGo, currentRound: this.currentRound })
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
.round-content {
    display: flex;
    align-items: center;
    justify-content: center;    
}
.round-content button {
    color: white;
    border: none;
    cursor: pointer;
    background-color: transparent;
}
.round-name {
    display: none;
    margin: 0px 30px;
}
.round-name.active {
    display: inline-block;
}
.arrow {
    width: 25px;
}
.arrow-prev {
    transform: rotate(180deg);
}

@media screen and (max-width: 1000px) {
    .round-name {
        margin: 0px 15px;
    }
}

.blink-blink {
  animation: blink-blink 1s linear infinite;
}

@keyframes blink-blink {
  50% {
    opacity: 0;
  }
}
</style>
