<template>
  <footer>
    <div v-html="footer.meh">
      {{ footer.meh }}
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import ButtonMenu from "@/components/Home/ButtonMenu.vue"

export default {
  components: {
    ButtonMenu
  },
  computed: {
    ...mapState({
      footer: state => state.footer
    })
  }
}
</script>

<style scoped lang="scss">
footer {
  bottom: 0;
  width: 100%;
  position: fixed;
  font-size: 12px;
  font-weight: bold;
  padding: 10px 10px;
  border-top: 1px solid $blue-color;
  background-color: black;
}
</style>

