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
      userScore: 0,
      userLife: 5
    }
  },
  created () {
    if (!this.token || !this.gameData) {
      this.$router.push({ name: 'Login' })
    } else {
      this.rounds = [ this.gameData.round ]
      this.sounds = [ this.gameData.sounds ]
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