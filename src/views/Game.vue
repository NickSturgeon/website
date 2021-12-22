<script setup lang="ts">
import { shallowRef, watch } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import GameDetails from "../components/game/GameDetails.vue";
import { scrollToHash } from "../utilities/helpers";
import games from "../assets/json/games.json";

const router = useRouter();
const route = useRoute();

const id = shallowRef(route.params.id);

const game = shallowRef<Game>();
// const img = shallowRef<string>();

onBeforeRouteUpdate((to) => {
  id.value = to.params.id;
});

watch(
  id,
  (id) => {
    game.value = games.find((g) => g.id === id);
    if (game.value === undefined) router.replace("/");

    // img.value = new URL(`../assets/img/games/${id.value}.png`, import.meta.url).href;

    scrollToHash(route.hash);
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <div class="relative max-w-3xl m-auto justify-between items-center">
      <h1 class="px-4 md:px-0 text-white text-4xl my-5">{{ game?.title }}</h1>
      <!-- <transition
        enter-active-class="transition-opacity duration-500 ease"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-500 ease"
        leave-to-class="opacity-0"
      >
        <img :key="img" class="w-12 absolute bottom-0 right-4 md:right-0" :src="img" />
      </transition> -->
    </div>

    <game-details :game="game!" />
  </div>
</template>
