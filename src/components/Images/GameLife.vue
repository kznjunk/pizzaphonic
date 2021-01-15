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
    margin: 0px 3px;
}
img:nth-child(2),
img:nth-child(4) {
    position: absolute;
}
img:nth-child(1) {
    z-index: 9;
    margin-top: 13px;
}
img:nth-child(2) {
    z-index: 8;
    margin-top: -8px;
    margin-left: -35px;
}
img:nth-child(3) {
    z-index: 7;
    margin-top: 12px;
}
img:nth-child(4) {
    z-index: 6;
    margin-top: -8px;
    margin-left: 40px;
}
img:nth-child(5) {
    z-index: 5;
    margin-top: 12px;
}
</style>
