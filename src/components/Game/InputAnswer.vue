<template>
    <div id="inputAnswer">
        <div>
            <input
              v-on:keyup.enter="submitUserAnswer"
              v-model="userAnswer"
              ng-model='userAnswer'
              id="answer"
              type=""
              name=""
              placeholder="Type your answer"
              autocomplete="off"
            />
        </div>
    </div>
</template>

<script>
import EventBus from "@/components/EventBus"

export default {
  props: {
    text: String,
    target: String,
    color: String
  },
  data: function(){
    return {
        userAnswer: null
    }
  },
  methods: {
    submitUserAnswer () {
      const userAnswer = this.userAnswer

      if (userAnswer && userAnswer.length > 2) {
        EventBus.$emit('userAnswer', this.userAnswer)
        this.userAnswer = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
#inputAnswer {
  position: absolute;
  bottom: 36px;
  left: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
}
#inputAnswer > div {
  text-align: center;
}
#inputAnswer > div input {
  border: none;
  border-top: 1px solid $blue-color;
  border-bottom: 1px solid $blue-color;
  background-color: #101012;
  color: white;
  width: 100%;
  height: 51px;
  text-align: center;
  font-size: 22px;
}
#inputAnswer > div input:focus {
}
</style>
