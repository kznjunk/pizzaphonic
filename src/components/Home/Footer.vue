<template>
  <footer>
    <div v-html="footerMsg">
      {{ footerMsg }}
    </div>
  </footer>
</template>

footer

<script>
import { mapState } from 'vuex'
import ButtonMenu from "@/components/Home/ButtonMenu.vue"

export default {
  components: {
    ButtonMenu
  },
  data: function(){
    return {
      footerMsg: ''
    }
  },
  created() {
    const now = new Date()
    const YYYY = now.getFullYear()

    this.footerMsg = this.footer.meh.replace('{{YYYY}}', YYYY)
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
.suchWow footer {
  animation: noiceBorderColor .5s linear 0s infinite;
}
</style>
