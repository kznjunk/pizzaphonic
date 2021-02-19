<template>
    <div class="login">
    <div>
        <div>
            <ButtonMenu
                :text="login.guest"
                :action="guestSubscribe"
            />
        </div>
        <div class="or-separator">
            <span>{{ login.or }}</span>
        </div>
        <div class="form-ranked">
            <input
                v-model="pseudo"
                id="pseudo"
                type="pseudo"
                name="pseudo"
                :placeholder="login.pseudoPlaceholder"
                class="subscribeInput"
                v-bind:class="{ 'error': isErrorPseudo }"
            />
            <input
                v-model="email"
                id="email"
                type="email"
                name="email"
                :placeholder="login.emailPlaceholder"
                class="subscribeInput"
                v-bind:class="{ 'error': isErrorEmail }"
            />
            <ButtonMenu
                :text="login.rank"
                :action="rankedSubscribe"
                color="red"
            />
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from 'vuex'
import ButtonMenu from "@/components/Home/ButtonMenu.vue"

export default {
  components: {
    ButtonMenu
  },
  data: function(){
    return {
        pseudo: null,
        email: null,
        isErrorPseudo: false,
        isErrorEmail: false
    }
  },
  methods: {
    guestSubscribe () {
        this.subscribe({
            email: 'unknown@unknown.com',
            pseudo: 'unknown',
            source: document.referrer
        })
    },
    rankedSubscribe() {
        const pseudo = this.pseudo
        const email = this.email

        this.isErrorPseudo = !this.isValidPseudo(pseudo)
        this.isErrorEmail = !this.isValidEmail(email)

        if (this.isErrorPseudo || this.isErrorEmail) {

        } else {
            this.subscribe({
                email,
                pseudo,
                source: document.referrer
            })
        }
    },
    subscribe (params) {
        axios
            .get('/what', { params })
            .then(response => {
                const data = response.data
                const token = data && data.token
                const gameData = data && data.game

                if (token && gameData) {
                    this.$router.push({ name: 'Play', params: {token, gameData } })
                } else {
                    console.log('hmm show err')
                }
            })
            .catch(error => {
                console.log(error)
            })
    },
    isValidPseudo (pseudo) {
        if (pseudo) {
            const isGoodType = typeof pseudo === 'string'
            const isLengthValid = pseudo.length >= 2 && pseudo.length <= 50
            const isRegexValid = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>.?๐฿]*$/.test(pseudo)
            const isRegexInvalid = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(pseudo)

            return isGoodType && isLengthValid && isRegexValid && !isRegexInvalid
        }

        return false
    },
    isValidEmail (email) {
        console.log(email)
        if (email) {
            const isGoodType = typeof email === 'string'
            const isLengthValid = email.length >= 5 && email.length <= 150
            const isRegexValid = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(email)

            return isGoodType && isLengthValid && isRegexValid
        }

        return false
    }
  },
  computed: {
    ...mapState({
      login: state => state.login
    })
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
        border: 2px solid transparent;
    }
    input.error {
        border: 2px solid $red-color;
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
