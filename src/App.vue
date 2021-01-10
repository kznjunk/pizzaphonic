<template>
  <div id="app">
    <div id="app-content">
      <router-view />
    </div>
    <footer>
      <div>
        © 2021 - <a href="https://twitter.com/kibwashere" target="_blank">@kibwashere</a>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
