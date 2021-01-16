<template>
  <div class="home">
    <img alt="Pizzaphonic" src="../assets/pp.png" />
    <h2>Are you gamer enough..?</h2>
    <div class="home-menus">
      <ButtonMenu
        text="RULES"
        target="/rules"
      />
      <ButtonMenu
        text="LEADERBOARD"
        target="/leaderboard"
      />
      <br/>
      <ButtonMenu
        text="PLAY"
        target="/login"
        color="red"
      />
    </div>
  </div>
</template>

<script>
import ButtonMenu from "@/components/Home/ButtonMenu.vue"

export default {
  components: {
    ButtonMenu
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