<template>
  <div class="visual">
      <div data-round="1" v-bind:class="{ 'active': currRound === 1 }">
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div><br/>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
      </div>
      <div data-round="2" v-bind:class="{ 'active': currRound === 2 }">
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div><br/>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
          <div class="aSound" style="height:50px"></div>
      </div>
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
  created () {
    EventBus.$on('roundChanged', ({ wayToGo, currRound }) => {
      this.currRound = currRound
    })
  } 
  // methods: {
  //   myMethod () {
  //     EventBus.$emit("my-event")
  //   }
  // }
}
</script>

<style scoped lang="scss">
.visual > div {
  display: none;
}.visual > div.active {
  display: inline-block;
}
.aSound {
  display: inline-block;
  width: 50px;
  height: 10px;
  border: 1px solid rgba(51, 153, 255, 0.4);
  background-color: rgba(51, 153, 255, 0.2);
  margin: 5px;
  position: relative;
}
.aSound:nth-child(odd) {
  border-top-left-radius: 15px;
}
.aSound:nth-child(even) {
  border-top-right-radius: 15px;
}
</style>
