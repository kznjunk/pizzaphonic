<template>
  <div class="play">
    <LoadingScreen
      :showLoadingScreen="showLoadingScreen"
      :title="loadingScreenTitle"
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
import EventBus from '@/components/EventBus'
import { preload } from '@kznjunk/pre-load'

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
      showLoadingScreen: true,
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
      const host = 'https://di3xllda87oyr.cloudfront.net'
      const type = 'sounds'
      const folderName = `1-popular`
      const extension = '.wav'
      const sndsToPreload = this.gameData.sounds.map(snd => `${host}/${type}/${folderName}/${snd.soundFileName}${extension}`)
      const imgsToPreload = [
        require('@/assets/lifeY.png'),
        require('@/assets/lifeN.png'),
        require('@/assets/bg.jpg'),
        'https://images.unsplash.com/photo-1556040142-f86cda4b2819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=100'
      ]

      await Promise.all([
        preload(imgsToPreload, () => { this.loadingScreenTitle = 'gogo' }),
        preload(sndsToPreload, () => { this.loadingScreenTitle = 'gogo goooooo' })
      ])

      window.setTimeout(() => {
        this.showLoadingScreen = false
      }, 2000)
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
      const imageUrl = this.getImageUrl(imgUrl)
      this.userScore++
      const isNewRound = this.userScore % 3 === 0 && this.rounds.some(item => item.name !== round.name)

      this.addImageInBubble(id, imageUrl)
      this.showGoodAnswerLightbox(imageUrl)
      if (isNewRound) this.unlockNextRound(round, sounds)
    },
    getImageUrl(imgUrl) {
      const host = 'https://di3xllda87oyr.cloudfront.net'
      const type = 'images'
      const folderName = `${this.currentRound}-${this.rounds[this.currentRound - 1]['folderName']}`
      const extension = '.png'

      return `${host}/${type}/${folderName}/${imgUrl}${extension}`
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
    unlockNextRound(round, sounds) {
      this.rounds.push(round)
      this.sounds.push(sounds)
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