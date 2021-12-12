import Home from "./views/Home.vue";
import Game from "./views/Game.vue";
import _404 from "./views/_404.vue";

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
  {
    path: "/:path(.*)",
    component: _404,
  },
];
