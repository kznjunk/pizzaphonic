<template>
  <div>
    <div class="top-banner">
        <a href="">
            <img alt="Pizzaphonic" src="../assets/pp-only.png" />
        </a>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
.top-banner {
    padding: 10px 20px;
    border-bottom: 1px solid white;

    img {
        height: 40px;
    }
}
</style>
