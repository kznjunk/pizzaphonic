<template>
  <div class="home">
    <img alt="Pizzaphonic" src="../assets/pp.png" />
    <h2>Are you gamer enough..?</h2>
    <div class="menu">
      <div><router-link to="/rules" class="menu-button">RULES</router-link></div>
      <div><router-link to="/leaderboard" class="menu-button">LEADERBOARD</router-link></div>
      <div><router-link to="/credits" class="menu-button">CREDITS</router-link></div>
      <br/>
      <div><router-link to="/play" class="menu-button" style="color:red;">PLAY</router-link></div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss">
.home {
  padding: 30px 10px;
}

.menu {
  > div {
    display: block;
    margin: 10px 15px;
  }
  .menu-button {
    width: 150px;
    color: white;
    padding: 5px 10px;
    font-weight: bold;
    border-radius: 15px;
    display: inline-block;
    text-decoration: none;
    border: 1px solid rgb(48, 118, 197);
  }
  .menu-button:hover {
    background-color: rgb(48, 118, 197);
  }
}
</style>