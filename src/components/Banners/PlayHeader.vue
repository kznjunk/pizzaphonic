<template>
    <div class="play-header">
        <div class="left-side">
            <PlayQuit target="/" />
        </div>
        <div class="play-header-logo">
            < 5. Best Soundtrack >
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
import PlayQuit from "@/components/Buttons/PlayQuit.vue"

export default {
  components: {
    GameLife,
    PlayQuit
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
    .play-header-logo {
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
