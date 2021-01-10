import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Play from "../views/Play.vue";

import Menus from "../views/Menus.vue";
import Rules from "../views/Rules.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Login from "../views/Login.vue";
import About from "../views/About.vue";

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
    component: Play
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
