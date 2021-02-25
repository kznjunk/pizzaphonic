<template>
  <div class="play">
    <LoadingScreen
      :title="loadingScreenTitle"
      :loading="loading"
    />
    <Lightbox
      v-if="isLightboxActive || userLife < 1"
      v-on:click.native="isLightboxActive = false"
      :title="lightboxTitle"
      :image="lightboxImage"
      :content="lightboxContent"
    />
    <ImageFullBackground />
    <Header
      :rounds="rounds"
      :sounds="sounds"
      :userScore="userScore"
      :userLife="userLife"
      :highlightNewRound="highlightNewRound"
    />
    <!-- OVERLAY
    <div class="pageOverlay">
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
    <ButtonSound
      :rounds="rounds"
      :sounds="sounds"
    />
    <InputAnswer />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { preload } from '@kznjunk/pre-load'

import { getImage, getSound } from '@/helpers'
import EventBus from '@/components/EventBus'
import LoadingScreen from '@/components/Game/LoadingScreen.vue'
import Lightbox from '@/components/Game/Lightbox.vue'
import ImageFullBackground from '@/components/Game/ImageFullBackground.vue'
import Header from '@/components/Game/Header.vue'
import ButtonSound from '@/components/Game/ButtonSound.vue'
import InputAnswer from '@/components/Game/InputAnswer.vue'

export default {
  components: {
    LoadingScreen,
    Lightbox,
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
      loading: {
        enable: true,
        from: 0,
        to: 100,
        current: 0
      },
      loadingScreenTitle: 'Round 1: Popular Games',
      rounds: null,
      sounds: null,
      currentRound: 1,
      highlightNewRound: false,
      userScore: 0,
      userLife: 5,
      isLightboxActive: false,
      lightbox: {
        title: null,
        image: null,
        content: null // to use
      },
      lightboxTitle: null,
      lightboxImage: null,
      lightboxContent: null
    }
  },
  async created () {
    this.rounds = [ this.gameData.round ]
    this.sounds = [ this.gameData.sounds ]

    this.preloadItems()
    this.listenCurrentRound()
    this.listenUserAnswer()
  },
  methods: {
    async preloadItems () {
      const sndsToPreload = this.gameData.sounds.map(snd => getSound('1-popular', snd.soundFileName))
      const imgsToPreload = [
        // require('@/assets/lifeY.png'),
        // require('@/assets/lifeN.png'),
        // require('@/assets/bg.jpg')
      ]
      const itemsToPreload = sndsToPreload.concat(imgsToPreload)

      await preload(itemsToPreload, { cb_foreach: this.updateLoadingScreen })

      window.setTimeout(() => {
        this.loading.enable = false
      }, 2000)
      window.setTimeout(() => {
        this.loading.current = 0
      }, 3000) 
    },
    updateLoadingScreen () {
      this.loading.current = this.loading.current + 12.5
      console.log(this.loading.current)
      // this.loadingScreenStep++
      // this.loadingScreenTitle = 
      // this.loadingScreenProgress = 
    },
    listenCurrentRound () {
      EventBus.$on('roundChanged', ({ currentRound }) => {
        this.currentRound = currentRound
        this.highlightNewRound = false
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
      const folderName = `${this.currentRound}-${this.rounds[this.currentRound - 1]['folderName']}`
      const imageUrl = getImage(folderName, imgUrl)
      this.userScore++
      const isNewRound = this.userScore % 3 === 0 && this.rounds.some(item => item.name !== round.name)

      this.addImageInBubble(id, imageUrl)
      this.showGoodAnswerLightbox(imageUrl)
      if (isNewRound) this.unlockNextRound(round, sounds)
    },
    addImageInBubble (id, imageUrl) {
      const soundIndex = this.sounds[this.currentRound - 1].findIndex(sound => sound.id === id)
      const soundsPath = this.sounds[this.currentRound - 1][soundIndex]

      this.$set(soundsPath, 'imgUrl', imageUrl)
    },
    showGoodAnswerLightbox (imageUrl) {
      this.lightboxTitle = 'You unlocked a new round!'
      // this.lightboxTitle = 'Nice one'
      this.lightboxImage = imageUrl
      this.lightboxContent = 'Such wow'
      this.isLightboxActive = true

      window.setTimeout(() => {
        this.isLightboxActive = false
      }, 3000)
    },
    async unlockNextRound(round, sounds) {
      this.loading.current = 0
      this.loading.enable = true
      this.rounds.push(round)
      this.sounds.push(sounds)

      const folderName = `${this.rounds.length}-${round.folderName}`
      const sndsToPreload = sounds.map(snd => getSound(folderName, snd.soundFileName))

      await preload(sndsToPreload, { cb_foreach: this.updateLoadingScreen })

      window.setTimeout(() => {
        this.loading.enable = false
      }, 2000)
      window.setTimeout(() => {
        this.loading.current = 0
      }, 3000) 

      this.highlightNewRound = true
    },
    handleWrongAnswer () {
      this.userLife--
      var audio = new Audio(require('@/assets/wrongAnswer.wav'))
      audio.play()

      if (this.userLife < 1) {
        this.lightboxTitle = 'You died.'
        this.lightboxImage = null
        this.lightboxContent = `Not very impressive score: ${this.userScore}, have another try?`
        this.isLightboxActive = true
      }
    }
  },
  computed: {
    ...mapState({
      play: state => state.play
    })
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