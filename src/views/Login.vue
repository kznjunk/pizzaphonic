<template>
  <div class="login">
    <div>
        <div>
            <ButtonMenu
                text="GUEST MODE"
                :action="hereWeGo"
            />
        </div>
        <div class="or-separator">
            <span>OR</span>
        </div>
        <div class="form-ranked">
            <input id="pseudo" type="pseudo" name="pseudo" placeholder="Your pseudo" class="subscribeInput"/>
            <input id="email" type="email" name="email" placeholder="Your email" class="subscribeInput"/>
            <ButtonMenu
                text="RANKED MODE"
                target="/play"
                color="red"
            />
        </div>
    </div>
  </div>
</template>

<script>
import ButtonMenu from "@/components/Home/ButtonMenu.vue"

export default {
  components: {
    ButtonMenu
  },
  methods: {
    hereWeGo () {
        console.log('-- aze')
    },
    doCommand(e) {
        const currTarget = e.target
        const key = e.keyCode || e.charCode
        const isLeft = key == 37
        const isRight = key == 39

        if (isLeft) {
            this.changeRound('prev')
        } else if (isRight) {
            this.changeRound('next')
        }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
    text-align: center;

    input {
        width: 150px;
        padding: 10px;
        display: block;
        margin: 15px auto;
    }
    .or-separator {
        margin: 25px 0px;
        font-weight: bold;
    }
    .or-separator > span {
        position: relative;
    }
    .or-separator > span:before {
        right: 100%;
    }
    .or-separator > span:after {
        left: 100%;
    }
    .or-separator > span:before,
    .or-separator > span:after {
        top: 50%;
        width: 50px;
        margin: 0 20px;
        content: '';
        position: absolute;
        border-bottom: 1px solid white;
    }
}
</style>
