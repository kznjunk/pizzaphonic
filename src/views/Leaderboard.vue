<template>
  <div class="leaderboard-content">
    <h2 class="menu-title">{{ leaderboard.title }}</h2>
    <div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th title="Country">{{ leaderboard.country }}</th>
                        <th>{{ leaderboard.pseudo }}</th>
                        <th>{{ leaderboard.score }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                      v-for="(userData, index) in usersData"
                      v-bind:class="[`ohh-${userData.isK}`]"
                    >
                        <td>{{ index + 1 }}</td>
                        <td
                            :title="userData.countryCode || leaderboard.farFarAwayTitle"
                        >
                            {{ userData.flagEmoji || userData.countryCode || leaderboard.farFarAway }}
                        </td>
                        <td>{{ userData.pseudo }}</td>
                        <td>{{ userData.score }} &#9834;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      info: null,
      loading: true,
      errored: false,
      usersData: null
    }
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
    }
  },
  mounted () {
    axios
      .get('/about')
      .then(response => {
        this.usersData = response.data.value
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    ...mapState({
      leaderboard: state => state.leaderboard
    })
  }
}
</script>

<style lang="scss">
.leaderboard-content {
    height: 100%;
    text-align: left;
    display: flex;
    justify-content: center;
    flex-direction: column;

    > div {
        overflow: auto;
        height: calc(100% - 300px);
    }
    > div::-webkit-scrollbar-track {
        border-radius: 6px;
        background-color: transparent;
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
    }
    > div::-webkit-scrollbar {
        width: 8px;
        background-color: transparent;
    }
    > div::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background-color: #D62929;
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,.5);
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }
    thead th {
        top: 0;
        position: sticky;
    }
    table tbody tr:nth-child(1),
    table tbody tr:nth-child(2),
    table tbody tr:nth-child(3) {
        color: red;
    }
    table th,
    table td {
        padding: 3px 10px;
        background-color: black;
    }
    table td:nth-child(3){
        max-width: 25ch;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    table th:nth-child(4),
    table td:nth-child(4) {
        padding-right: 25px;
    }
    .ohh-1 {
      animation: noiceColor .5s linear 0s infinite;
    }
}
</style>