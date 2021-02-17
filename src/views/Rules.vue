<template>
  <div class="about">
    <h2 class="menu-title">{{ rules.title }}</h2>
    <p>
        <ol>
            <li>{{ rules.r1 }}</li>
            <li>{{ rules.r2 }}</li>
            <li>{{ rules.r3 }}</li>
            <li>{{ rules.r4 }}</li>
        </ol>
    </p>
    <h2 class="menu-title">{{ rules.tips }}</h2>
    <ul>
        <li>{{ rules.t1 }}</li>
        <li>{{ rules.t2 }}</li>
        <li>{{ rules.t3 }}</li>
        <li>{{ rules.t4 }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      rules: state => state.rules
    })
  }
}
</script>

<style lang="scss">
.about {
    text-align: left;
}
ol, ul {
    list-style-position: inside;
}
</style>