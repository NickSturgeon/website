<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import NavFooter from "./components/Footer.vue";
</script>

<template>
  <div class="w-screen flex flex-col min-h-screen bg-zelda bg-left bg-cover bg-fixed">
    <nav-bar />
    <div class="container flex-grow m-auto md:px-8">
      <router-view />
    </div>
    <nav-footer />
  </div>
</template>
