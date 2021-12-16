<script setup lang="ts">
import { ref, shallowRef, defineAsyncComponent, watchEffect } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import GameDetails from "@/components/game/GameDetails.vue";
import N64Box from "@/components/common/N64Box.vue";

import games from "../assets/json/games.json";

const router = useRouter();
const route = useRoute();

const slug = ref(route.params.slug);

const game = shallowRef<Game>();
const img = shallowRef<string>();
const faq = shallowRef();

onBeforeRouteUpdate((to) => {
  slug.value = to.params.slug;
});

watchEffect(async () => {
  game.value = games.find((g) => g.slug === slug.value);
  if (game.value === undefined) router.replace("/");
  img.value = new URL(`../assets/img/games/${slug.value}.png`, import.meta.url).href;
  faq.value = defineAsyncComponent(() => import(`../assets/faq/${game.value!.faq}.md`));
});
</script>

<template>
  <div>
    <div class="relative max-w-3xl m-auto justify-between items-center">
      <h1 class="text-white text-4xl my-5">{{ game?.title }}</h1>
      <div>
        <transition name="fade">
          <img :key="img" class="w-12 absolute bottom-0 right-0" :src="img" />
        </transition>
      </div>
    </div>

    <game-details :game="game!" />

    <n64-box class="mt-4" :file="2" heading="FAQ">
      <faq class="markdown" />
    </n64-box>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
