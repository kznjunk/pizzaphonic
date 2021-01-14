<template>
    <img src="@/assets/lifeY.png" alt="life" rel="preload"/>
    <!--<div class="rightLife">
            <img ng-repeat="i in getNumber(5) track by $index" ng-src="$index < lifes ? 'img/lifeY.png' : 'img/lifeN.png'" alt="life"/>
    </div>-->
</template>

<script>
export default {
  props: {
    target: String
  }
}
</script>

<style scoped lang="scss">
img {
    width: 30px;
}
</style>
