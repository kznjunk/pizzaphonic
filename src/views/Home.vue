<template>
  <div class="home">
    <img alt="Pizzaphonic" src="../assets/pp.png" />
    <h2>Are you gamer enough..?</h2>
    <div>
      <MenusButton
        text="RULES"
        target="/rules"
      />
      <MenusButton
        text="LEADERBOARD"
        target="/leaderboard"
      />
      <MenusButton
        text="CREDITS"
        target="/credits"
      />
      <br/>
      <MenusButton
        text="PLAY"
        target="/login"
        color="red"
      />
    </div>
  </div>
</template>

<script>
import MenusButton from "@/components/Buttons/MenusButton.vue"

export default {
  components: {
    MenusButton
  }
}
</script>

<style lang="scss">
.home {
  padding: 30px 10px;
}
</style>