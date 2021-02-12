import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Play from "../views/Play.vue";

import Menus from "../views/Menus.vue";
import Rules from "../views/Rules.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/menus',
    name: 'Menus',
    component: Menus,
    children: [
      {
        path: "/rules",
        name: "Rules",
        component: Rules
      },
      {
        path: "/leaderboard",
        name: "Leaderboard",
        component: Leaderboard
      },
      {
        path: "/login",
        name: "Login",
        component: Login
      }
    ]
  },
  {
    path: "/play",
    name: "Play",
    component: Play,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const wasPlayPage = from.name === 'Play'

//   if (wasPlayPage) {
//     const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
//     if (answer) next()
//   } else {
//     next()
//   }
// })

export default router;
