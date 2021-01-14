<template>
    <div class="play-header">
        <div class="left-side">
            <MenusPrevious target="/" />
        </div>
        <div class="play-header-logo">
            <router-link to="/">
                <img alt="Pizzaphonic" src="@/assets/pp-only.png" />
            </router-link>
        </div>
        <div class="right-side">
            <GameLife />
            <GameLife />
            <GameLife />
            <GameLife />
            <GameLife />
        </div>
    </div>
</template>

<script>
import GameLife from "@/components/Images/GameLife.vue"
import MenusPrevious from "@/components/Buttons/MenusPrevious.vue"

export default {
  components: {
    GameLife,
    MenusPrevious
  }
}
</script>

<style scoped lang="scss">
.play-header {
    top: 0;
    width: 100%;
    position: static;

    padding: 10px 0px;
    border-bottom: 1px solid white;

    > div {
        display: inline-flex;
    }
    .left-side {
        left: 20px;
        height: 40px;
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .play-header-logo img {
        height: 40px;
    }
    .right-side {
        right: 20px;
        height: 40px;
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
