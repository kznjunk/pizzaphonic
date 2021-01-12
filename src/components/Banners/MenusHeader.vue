<template>
    <div class="top-banner">
        <div class="previous">
            <MenusPrevious target="/" />
        </div>
        <div>
            <router-link to="/">
                <img alt="Pizzaphonic" src="@/assets/pp-only.png" />
            </router-link>
        </div>
    </div>
</template>

<script>
import MenusPrevious from "@/components/Buttons/MenusPrevious.vue"

export default {
  components: {
    MenusPrevious
  }
}
</script>

<style scoped lang="scss">
.top-banner {
    top: 0;
    width: 100%;
    position: fixed;

    padding: 10px 0px;
    border-bottom: 1px solid white;

    > div {
        display: inline-block;
    }
    .previous {
        left: 20px;
        height: 40px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img {
        height: 40px;
    }
}
</style>
