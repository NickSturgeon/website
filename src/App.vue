<script setup lang="ts">
import NavMenu from "@/components/common/Menu.vue";
import NavFooter from "@/components/common/Footer.vue";
</script>

<template>
  <div class="w-screen flex flex-col min-h-screen bg-zelda bg-left bg-cover bg-static">
    <nav-menu />
    <div class="container flex-grow m-auto md:px-8">
      <router-view />
    </div>
    <nav-footer />
  </div>
</template>
