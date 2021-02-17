// import { getLanguage } from '@/helpers/get-language'
// const language = getLanguage()
const language = null

const wording = require(`@/data/${language || 'en'}/wording`)
const {
  home,
  rules,
  leaderboard,
  login,
  play,
  footer
} = wording.default

export default {
  home,
  rules,
  leaderboard,
  login,
  play,
  footer
}
