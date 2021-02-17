<template>
  <div class="home">
    <img alt="Pizzaphonic" src="../assets/pp.png" />
    <h2>{{ home.slogan }}</h2>
    <div class="home-menus">
      <ButtonMenu
        :text="home.rules"
        target="/rules"
      />
      <ButtonMenu
        :text="home.leaderboard"
        target="/leaderboard"
      />
      <br/>
      {{ home.blaaaa }}
      <ButtonMenu
        :text="home.play"
        target="/login"
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
  computed: {
    ...mapState({
      home: state => state.home
    })
  }
}
</script>

<style lang="scss">
.home {
    padding: 0px 10px;
    height: calc(100% - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>