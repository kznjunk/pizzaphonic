<template>
  <div class="play">
        <ImageFullBackground />
        <Header
          :rounds="rounds"
          :sounds="sounds"
          :userScore="userScore"
          :userLife="userLife"
        />
        <!-- OVERLAY
        <div class="pageOverlay">
            <div class="correctAnswer displayNone" ng-class="currentOverlay === 1 && lifes > 0 ? '' : 'displayNone'"></div>
            <div class="finalAnswer displayNone" ng-class="currentOverlay === 2 && lifes > 0 ? '' : 'displayNone'">
                <div class="overlayTitle">Good Job!</div>
                <div></div>
            </div>
            <div class="gameOver displayNone" ng-class="currentOverlay === 4 && lifes === 0 ? '' : 'displayNone'">
                <div class="overlayTitle">Game Over!</div>
                <div class="overlaySubTtle">Your score is ♪!</div><br/>
                <div class="resetButton">
                    <a href="https://twitter.com/intent/tweet?text=@kibwashere, YAY!!%20I%20scored%20 todo score %20♪%20on%20%23pizzaphonic" target="_blank"  onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');return false;">
                        <span>Tweet it</span>
                    </a>
                </div>
                <div class="resetButton" >Try again</div>
            </div>
        </div> -->
        <!-- END OF THE OVERLAY -->
        <!-- SUCH GREAT VISUAL -->
        <ButtonSound
          :rounds="rounds"
          :sounds="sounds"
        />
        <!-- END OF THE SUCH GREAT VISUAL -->
        <!-- MAIN CONTENT
        <div class="page">
            <div class="content">
                LOADING PIZZA
                <div class="loadingPizza"></div>
                END OF LOADING PIZZA
            </div>
        </div>
        END OF MAIN CONTENT -->
        <InputAnswer />
  </div>
</template>

<script>
import axios from 'axios'
import EventBus from '@/components/EventBus'
import ImageFullBackground from '@/components/Game/ImageFullBackground.vue'
import Header from '@/components/Game/Header.vue'
import ButtonSound from '@/components/Game/ButtonSound.vue'
import InputAnswer from '@/components/Game/InputAnswer.vue'

export default {
  components: {
    ImageFullBackground,
    Header,
    ButtonSound,
    InputAnswer
  },
  props: {
    token: String,
    gameData: Object
  },
  data: function(){
    return {
      rounds: null,
      sounds: null,
      currentRound: 1,
      userScore: 0,
      userLife: 5
    }
  },
  created () {
    this.isUserLogged()
    this.listenCurrentRound()
    this.listenUserAnswer()
  },
  methods: {
    isUserLogged () {
      if (!this.token || !this.gameData) {
        this.$router.push({ name: 'Login' })
      } else {
        this.rounds = [ this.gameData.round ]
        this.sounds = [ this.gameData.sounds ]
      }
    },
    listenCurrentRound () {
      EventBus.$on('roundChanged', ({ currentRound }) => {
        this.currentRound = currentRound
      })
    },
    listenUserAnswer () {
      EventBus.$on('userAnswer', userAnswer => {
        if (userAnswer && userAnswer.length > 2 && this.userLife) {
          const params = {
            userAnswer,
            userScore: this.userScore,
            currentRound: this.currentRound,
            userToken: this.token
          }

          axios
            .get('/no', { params })
            .then(response => {
              const data = response.data
              const answerData = data && data.answerData
              const gameData = data && data.gameData

              if (answerData && gameData) {
                this.handleGoodAnswer(answerData, gameData)
              } else {
                this.handleWrongAnswer()
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    handleGoodAnswer (answerData, gameData) {
      const { id, name, imgUrl } = answerData
      const { round, sounds } = gameData
      this.userScore++
      const isNewRound = this.userScore % 3 === 0 && this.rounds.some(item => item.name !== round.name)

      const host = 'https://di3xllda87oyr.cloudfront.net'
      const type = 'images'
      const folderName = `${this.currentRound}-${this.rounds[this.currentRound - 1]['folderName']}`
      const extension = '.png'
      const imageUrl = `${host}/${type}/${folderName}/${imgUrl}${extension}`

      this.$set(this.sounds[this.currentRound - 1][id - 1], 'imgUrl', imageUrl)

      if (isNewRound) {
        console.log('new round gogo')

        this.rounds.push(round)
        this.sounds.push(sounds)
      }
    },
    handleWrongAnswer () {
      this.userLife--
      var audio = new Audio(require('@/assets/wrongAnswer.wav'))
      audio.play()

      if (this.userLife < 1) {
        console.log('--lost')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.play {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>