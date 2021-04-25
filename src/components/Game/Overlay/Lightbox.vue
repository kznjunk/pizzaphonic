<template >
    <div class="lightbox">
      <h2 v-if="lightbox.title" class="font-akaya">{{ lightbox.title }}</h2>
      <p v-if="lightbox.content">{{ lightbox.content }}</p>
      <div v-if="user.life < 1">
        <ButtonMenu
          text="Tweet It"
          :action="tweetScore"
        />
        <ButtonMenu
          text="Try Again"
          :action="resetGame"
          color="red"
        />
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonMenu from "@/components/Home/ButtonMenu.vue"

export default {
  components: {
    ButtonMenu
  },
  props: {
    user: Object,
    loading: Object,
    lightbox: Object
  },
  methods: {
    resetGame () {
      this.$router.push({
        name: 'Login',
        params: { noWarning: true, userData: { savedEmail: this.user.email, savedPseudo: this.user.pseudo } }
      })
    },
    tweetScore () {
      const href = `https://twitter.com/intent/tweet?text=@pizzaphonic, YAY!!%20I%20scored%20${this.user.score}%20♪%20on%20%23pizzaphonic!%20#pizzaphonic`
      window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600')

      return false
    }
  },
  computed: {
    ...mapState({
      home: state => state.home
    })
  }
}
</script>

<style scoped lang="scss">
.lightbox {
  z-index: 4;
  max-width: 400px;
  padding: 10px 20px;
  img {
    width: 100px;
  }
}
</style>
