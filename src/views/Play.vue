<template>
  <div class="play">
    <transition name="component-fade">
      <Overlay
        v-if="loading.enable || lightbox.enable || user.life < 1"
        v-on:click.native="hideOverlay()"
        :loading="loading"
        :lightbox="lightbox"
      />
    </transition>
    <ImageFullBackground />
    <Header
      :rounds="rounds"
      :sounds="sounds"
      :user="user"
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
import Overlay from '@/components/Game/Overlay/Overlay.vue'
import ImageFullBackground from '@/components/Game/ImageFullBackground.vue'
import Header from '@/components/Game/Header.vue'
import ButtonSound from '@/components/Game/Buttons/Sound.vue'
import InputAnswer from '@/components/Game/InputAnswer.vue'

export default {
  components: {
    Overlay,
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
      user: {
        score: 0,
        life: 5,
        activeRound: 1,
        hasSeenNextRound: false
      },
      loading: {
        isFirst: true,
        enable: true,
        from: 0,
        to: 100,
        current: 0,
        ready: false
      },
      lightbox: {
        enable: false,
        title: null,
        image: null,
        content: null
      }
    }
  },
  async created () {
    this.rounds = [ this.gameData.round ]
    this.sounds = [ this.gameData.sounds ]

    const sndsToPreload = this.gameData.sounds.map(snd => getSound('1-popular', snd.soundFileName))
    const imgsToPreload = [
      // require('@/assets/lifeY.png'),
      // require('@/assets/lifeN.png'),
      // require('@/assets/bg.jpg')
    ]
    const itemsToPreload = sndsToPreload.concat(imgsToPreload)

    this.preloadItems(itemsToPreload)
    this.listenActiveRound()
    this.listenUserAnswer()
  },
  methods: {
    hideOverlay () {
      const isHideable = this.lightbox.enable || (this.loading.ready && this.loading.enable)

      if (isHideable && this.user.life > 0) {
        this.loading.enable = false
        this.lightbox.enable = false

        window.setTimeout(() => {
          this.loading.current = 0
          this.loading.isFirst = false
          this.loading.ready = false
        }, 2000) 
      }
    },
    async preloadItems (items) {
      await preload(items, { cb_foreach: this.updateLoadingScreen })

      window.setTimeout(() => {
        this.loading.ready = true
      }, 2000)
    },
    updateLoadingScreen () {
      this.loading.current = this.loading.current + 12.5
      // this.loadingScreenStep++
      // this.loadingScreenProgress = 
    },
    listenActiveRound () {
      EventBus.$on('roundChanged', ({ currentRound }) => {
        this.user.activeRound = currentRound
        this.user.hasSeenNextRound = false
      })
    },
    listenUserAnswer () {
      EventBus.$on('userAnswer', userAnswer => {
        if (userAnswer && userAnswer.length > 2 && this.user.life) {
          const params = {
            userAnswer,
            userScore: this.user.score,
            currentRound: this.user.activeRound,
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
      const folderName = `${this.user.activeRound}-${this.rounds[this.user.activeRound - 1]['folderName']}`
      const imageUrl = getImage(folderName, imgUrl)
      this.user.score++
      const isNewRound = this.user.score % 3 === 0 && this.rounds.some(item => item.name !== round.name)

      if (isNewRound) {
        this.unlockNextRound(round, sounds)
      } else {
        this.showGoodAnswerLightbox(imageUrl)
      }

      this.addImageInBubble(id, imageUrl)
    },
    addImageInBubble (id, imageUrl) {
      const soundIndex = this.sounds[this.user.activeRound - 1].findIndex(sound => sound.id === id)
      const soundsPath = this.sounds[this.user.activeRound - 1][soundIndex]

      this.$set(soundsPath, 'imgUrl', imageUrl)
    },
    showGoodAnswerLightbox (imageUrl) {
      this.lightbox.title = 'Nice one!'
      this.lightbox.image = imageUrl
      this.lightbox.content = 'Such wow'
      this.lightbox.enable = true

      window.setTimeout(() => {
        // this.lightbox.enable = false
      }, 3000)
    },
    async unlockNextRound(round, sounds) {
      this.loading.current = 0
      this.loading.enable = true
      this.rounds.push(round)
      this.sounds.push(sounds)

      const folderName = `${this.rounds.length}-${round.folderName}`
      const sndsToPreload = sounds.map(snd => getSound(folderName, snd.soundFileName))

      this.preloadItems(sndsToPreload)
      this.user.hasSeenNextRound = true
    },
    handleWrongAnswer () {
      this.user.life--
      var audio = new Audio(require('@/assets/wrongAnswer.wav'))
      audio.play()

      if (this.user.life < 1) {
        this.lightbox.title = 'You died.'
        this.lightbox.image = null
        this.lightbox.content = `Not very impressive score: ${this.user.score}, have another try?`
        this.lightbox.enable = true
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

.component-fade-enter-active {
  transition: opacity 0.2s ease;
}
.component-fade-leave-active {
  transition: opacity 1s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>