<template>
  <div class="play">
    <transition name="component-fade">
      <Overlay
        v-if="loading.enable || lightbox.enable || user.life < 1"
        v-on:click.native="hideOverlay()"
        :user="user"
        :loading="loading"
        :lightbox="lightbox"
      />
    </transition>
    <ImageFullBackground />
    <Header
      :rounds="rounds"
      :sounds="sounds"
      :user="user"
      :secrets="secrets"
    />
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
import konami from '@kznjunk/konami'

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
    gameData: Object,
    userData: Object
  },
  data: function(){
    return {
      rounds: null,
      sounds: null,
      secrets: [ false, false, false ],
      user: {
        score: 0,
        life: 5,
        activeRound: 1,
        hasSeenNextRound: false,
        answers: [ ],
        email: null,
        pseudo: null
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
    this.user.email = this.userData.email
    this.user.pseudo = this.userData.pseudo
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
    window.addEventListener('beforeunload', this.safetyExit)
    konami(this.showSecret)
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
console.log('-- bwop')
console.log(answerData)
console.log(gameData)
              if (answerData && gameData) {
                this.$set(this.secrets, 2, 'bwop')
                console.log(this.secrets)

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
        this.showGoodAnswerLightbox(imageUrl, isNewRound)
      }

      this.addImageInBubble(id, imageUrl)
    },
    addImageInBubble (id, imageUrl) {
      const soundIndex = this.sounds[this.user.activeRound - 1].findIndex(sound => sound.id === id)
      const soundsPath = this.sounds[this.user.activeRound - 1][soundIndex]

      this.$set(soundsPath, 'imgUrl', imageUrl)
    },
    showGoodAnswerLightbox (imageUrl, isNewRound) {
      const titles = this.play.success.titles
      const titleIndex = Math.floor(Math.random() * titles.length)
      this.lightbox.title = titles[titleIndex]
      // this.lightbox.image = imageUrl
      this.lightbox.enable = true

        window.setTimeout(() => {
          this.lightbox.enable = false
        }, 3000)
    },
    async unlockNextRound(round, sounds) {
      this.lightbox.title = 'You unlocked a new round!'

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
        const titles = this.play.fail.titles
        const titleIndex = Math.floor(Math.random() * titles.length)
        this.lightbox.title = titles[titleIndex]

        const subTitles = this.play.fail.subTitles[this.user.score % 10]
        const subTitleIndex = Math.floor(Math.random() * subTitles.length)
        this.lightbox.content = subTitles[subTitleIndex].replace('{{x}}', `${this.user.score} ♪`)

        this.lightbox.enable = true
      }
    },
    safetyExit (e) {
      const safetyLeave = this.play.safetyLeave
      e.returnValue = this.play.safetyLeave
      return safetyLeave
    },
    showSecret () {
      console.log('yay!')
    }
  },
  beforeRouteLeave(to, from, next) {
    const isStillAlive = this.user.life > 0

    if (isStillAlive) {
      if (!window.confirm(this.play.safetyLeave)) {
        return
      }
    }

    next()
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