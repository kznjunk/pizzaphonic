<template>
    <div class="round-content">
        <button @click="changeRound('prev')"><</button>
        <span class="round-name" v-bind:class="{ 'active': currRound === 1 }" data-round="1">1. Best Soundtrack</span>
        <span class="round-name" v-bind:class="{ 'active': currRound === 2 }" data-round="2">2. Best Soundtrack</span>
        <span class="round-name" v-bind:class="{ 'active': currRound === 3 }" data-round="3">3. Best Soundtrack</span>
        <span class="round-name" v-bind:class="{ 'active': currRound === 4 }" data-round="4">4. Best Soundtrack</span>
        <span class="round-name" v-bind:class="{ 'active': currRound === 5 }" data-round="5">5. Best Soundtrack</span>
        <button @click="changeRound('next')">></button>
    </div>
</template>

<script>
import EventBus from "@/components/EventBus";

export default {
  props: {
    target: String
  },
  data() {
    return {
      currRound: 1
    }
  },
  methods: {
    changeRound (wayToGo) {
        const isPrev = wayToGo === 'prev'
        const isNext = wayToGo === 'next'
        const isValidWay = (isPrev && this.currRound > 1) || (isNext && this.currRound < 5)

        if (isValidWay) {
            isPrev ? this.currRound-- : this.currRound++
            EventBus.$emit('roundChanged', { wayToGo, currRound: this.currRound })
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
