<script setup lang="ts">
import { shallowRef, defineAsyncComponent, watchEffect, onMounted } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import GameDetails from "../components/game/GameDetails.vue";
import N64Box from "../components/common/N64Box.vue";

import games from "../assets/json/games.json";

const router = useRouter();
const route = useRoute();

const slug = shallowRef(route.params.slug);

const game = shallowRef<Game>();
const img = shallowRef<string>();
const faq = shallowRef();

let hash = route.hash;

onBeforeRouteUpdate((to) => {
  slug.value = to.params.slug;
  hash = to.hash;
});

watchEffect(async () => {
  game.value = games.find((g) => g.slug === slug.value);
  if (game.value === undefined) router.replace("/");
  img.value = new URL(`../assets/img/games/${slug.value}.png`, import.meta.url).href;
  faq.value = defineAsyncComponent(() => import(`../assets/faq/${game.value!.faq}.md`));
  scrollToHash();
});

async function scrollToHash() {
  const checkDelayMs = 500;
  const maxRetries = 10;
  let currentTry = 0;

  if (hash !== "") {
    var element = document.getElementById(hash.slice(1));
    while (element === null && currentTry++ < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, checkDelayMs));
      element = document.getElementById(hash.slice(1));
    }
    element?.scrollIntoView();
  }
}
</script>

<template>
  <div>
    <div class="relative max-w-3xl m-auto justify-between items-center">
      <h1 class="px-4 md:px-0 text-white text-4xl my-5">{{ game?.title }}</h1>
      <div>
        <transition
          enter-active-class="transition-opacity duration-500 ease"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-500 ease"
          leave-to-class="opacity-0"
        >
          <img :key="img" class="w-12 absolute bottom-0 right-4 md:right-0" :src="img" />
        </transition>
      </div>
    </div>

    <game-details :game="game!" />

    <n64-box class="mt-4" :file="2" heading="FAQ">
      <faq class="markdown" />
    </n64-box>
  </div>
</template>
