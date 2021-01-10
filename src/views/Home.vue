<template>
  <div class="home">
    <img alt="Pizzaphonic" src="../assets/pp.png" />
    <h2>Are you gamer enough..?</h2>

    <div>
      <router-link to="/rules">Rules</router-link><br/>
      <router-link to="/leaderboard">Leaderboard</router-link><br/>
      <router-link to="/credits">Credits</router-link>
      <br/><br/>
      <router-link to="/play">Play</router-link>
    </div>


    <router-view />

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
