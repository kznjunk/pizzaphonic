<template>
    <div class="play-header">
        <div class="play-header-left">
            <IconExit target="/" />
        </div>
        <div class="play-header-center">
            <ButtonRound
                :rounds="rounds"
                :highlightNewRound="user.hasSeenNextRound"
            />
        </div>
        <div class="play-header-right">
            <IconLife
                :userLife="user.life"
            />
        </div>
        <div class="play-header-right score font-akaya">
            {{ user.score }} / {{ sounds.reduce((a, b) => a + b.length, 0) }} ♪
        </div>
    </div>
</template>

<script>
import IconLife from "@/components/Game/Icons/Life.vue"
import IconExit from "@/components/Game/Icons/Exit.vue"
import ButtonRound from "@/components/Game/Buttons/Round.vue"

export default {
  components: {
    IconLife,
    IconExit,
    ButtonRound
  },
  props: {
    rounds: Array,
    sounds: Array,
    user: Object
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
.play-header {
    top: 0;
    width: 100%;
    position: fixed;
    padding: 10px 0px;
    border-bottom: 1px solid white;
    background-color: rgba(0, 0, 0, 0.6);

    > div {
        display: inline-flex;
    }

    .play-header-left {
        left: 20px;
        height: 40px;
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .play-header-center {
        height: 40px;
        font-size: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .play-header-right {
        right: 20px;
        height: 40px;
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .play-header-right.score {
        margin: 0px 8px;
        font-size: 24px;
        font-weight: bold;
        margin-right: 120px;
    }

    @media screen and (max-width: 1000px) {
        .play-header-center {
            margin-top: 40px;
            font-size: 18px;
        }
        .play-header-right.score {
            font-size: 20px;
        }
        .play-header-right.score {
            margin-right: 90px;
        }
    }
}
</style>
