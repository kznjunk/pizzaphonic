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
            <button
              class="send-answer-button"
              @click="submitUserAnswer"
            >
              <IconSend />
          </button>
        </div>
    </div>
</template>

<script>
import EventBus from "@/components/EventBus"
import IconSend from "@/components/Game/Icons/Send.vue"

export default {
  components: {
    IconSend
  },
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
.send-answer-button {
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: 1;
  color: white;
  padding: 10px;
  border: 1px solid $blue-color;
  background-color: transparent;
}

</style>
