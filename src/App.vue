<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavMenu from "@/components/common/Menu.vue";
import NavFooter from "@/components/common/Footer.vue";

const route = useRoute();
const bg = computed(() => route.params.slug);
</script>

<template>
  <transition name="fade">
    <div
      v-if="bg === 'oot'"
      class="bg-oot bg-left top-0 bottom-0 right-0 bg-cover fixed w-full"
    ></div>
    <div
      v-else-if="bg === 'mm'"
      class="bg-mm bg-left top-0 bottom-0 right-0 bg-cover fixed w-full"
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
