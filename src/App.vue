<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import NavMenu from "./components/common/Menu.vue";
import NavFooter from "./components/common/Footer.vue";

// preload bg images for smoother transitions
onMounted(() => {
  const bg = [
    new URL("./assets/img/bg-oot.png", import.meta.url).href,
    new URL("./assets/img/bg-mm.png", import.meta.url).href,
    new URL("./assets/img/bg-tmc.png", import.meta.url).href,
  ];
  bg.forEach((bg) => (new Image().src = bg));
});

const route = useRoute();
const bg = computed(() => route.params.id);
</script>

<template>
  <transition
    appear
    enter-active-class="transition-opacity duration-500 ease"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-500 ease"
    leave-to-class="opacity-0"
  >
    <div
      v-if="bg === 'oot'"
      class="bg-oot bg-left top-0 bottom-0 right-0 bg-cover fixed w-full"
    ></div>
    <div
      v-else-if="bg === 'mm'"
      class="bg-mm bg-left top-0 bottom-0 right-0 bg-cover fixed w-full"
    ></div>
    <div
      v-else-if="bg === 'tmc'"
      class="bg-tmc bg-left top-0 bottom-0 right-0 bg-cover fixed w-full"
    ></div>
    <div
      v-else
      class="bg-purple bg-left top-0 bottom-0 right-0 bg-cover fixed w-full"
    ></div>
  </transition>
  <div class="flex flex-col min-h-screen relative">
    <nav-menu />
    <div class="container flex-grow m-auto md:px-8">
      <router-view />
    </div>
    <nav-footer />
  </div>
</template>
