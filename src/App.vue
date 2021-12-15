<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavMenu from "@/components/common/Menu.vue";
import NavFooter from "@/components/common/Footer.vue";
const route = useRoute();
const bg = computed(() => route.params.slug);
</script>

<template>
  <div
    class="min-w-screen flex flex-col min-h-screen bg-zelda bg-left bg-cover bg-fixed"
    :class="bg === 'oot' ? 'bg-oot' : bg === 'mm' ? 'bg-mm' : ''"
  >
    <nav-menu />
    <div class="container flex-grow m-auto md:px-8">
      <router-view />
    </div>
    <nav-footer />
  </div>
</template>
