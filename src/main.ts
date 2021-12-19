import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import { store, key } from "./store";
import { routes } from "./routes";

import "./styles.css";

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.use(store, key);
app.mount("#app");
