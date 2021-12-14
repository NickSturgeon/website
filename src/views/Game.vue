<script setup lang="ts">
import { ref, shallowRef, defineAsyncComponent, watchEffect, Component } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import games from "../assets/json/games.json";
import GameDetails from "../components/game/GameDetails.vue";
import N64Box from "../components/common/N64Box.vue";

const router = useRouter();
const route = useRoute();

const slug = ref(route.params.slug);
const getGame = () => games.find((g) => g.slug === slug.value);

const game = shallowRef<Game>();
const faq = shallowRef();

onBeforeRouteUpdate((to) => {
  slug.value = to.params.slug;
});

watchEffect(() => {
  game.value = getGame();
  if (game.value === undefined) router.replace("/");
  faq.value = defineAsyncComponent(() => import(`../assets/faq/${game.value!.faq}.md`));
});
</script>

<template>
  <h1 class="text-white text-4xl my-5 text-center">{{ game?.title }}</h1>

  <game-details :game="game!" />

  <n64-box class="mt-4" :file="2" heading="FAQ">
    <keep-alive>
      <faq class="markdown" />
    </keep-alive>
  </n64-box>
</template>
