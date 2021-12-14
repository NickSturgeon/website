import Home from "./views/Home.vue";
import Game from "./views/Game.vue";

export const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/games/:slug",
    component: Game,
    meta: {
      title: "Game",
    },
  },
  //   {
  //     path: "/:path(.*)",
  //     component: _404,
  //   },
];
