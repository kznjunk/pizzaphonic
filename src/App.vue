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
}

footer {
  bottom: 0;
  width: 100%;
  position: fixed;
  font-size: 12px;
  font-weight: bold;
  padding: 10px 10px;
  border-top: 1px solid white;
}
</style>
