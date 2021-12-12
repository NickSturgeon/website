<script async setup lang="ts">
import { ref, shallowRef, Component, defineAsyncComponent } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import games from "../assets/json/games.json";
import GameDetails from "../components/game/Details.vue";
import N64Box from "../components/N64Box.vue";

// --- SETUP ---
const router = useRouter();
const route = useRoute();

const slug = route.params.slug;
const data = games.find((g) => g.slug === slug);
if (data === undefined) {
  router.replace("/404");
}

const game = ref(data!);
let hasFaq = false;
let faq = shallowRef<Component>();

setFAQ();

// --- LIFECYCLE ---
// Run when navigating from one game to another (only slug changes)
onBeforeRouteUpdate((to, from, next) => {
  const slug = to.params.slug;
  const data = games.find((g) => g.slug === slug);
  if (data === undefined) {
    router.replace("/404");
  } else {
    game.value = data!;
    setFAQ();
    next();
  }
});

// --- FUNCTIONS ---
function setFAQ(): void {
  hasFaq =
    game.value.faq !== undefined && game.value.faq !== null && game.value.faq !== "";
  if (hasFaq) {
    faq.value = defineAsyncComponent<Component>(
      () => import(`../assets/faq/${game.value.faq}.md`)
    );
  }
}
</script>

<template>
  <h1 class="text-white text-4xl my-5 text-center">{{ game!.title }}</h1>

  <game-details :game="game" />

  <n64-box class="mt-4" v-if="hasFaq" :file="2" heading="FAQ">
    <faq class="markdown" />
  </n64-box>
</template>
