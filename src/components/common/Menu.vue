<script setup lang="ts">
import { ref } from "vue";

import games from "../../assets/json/games.json";

const menuOpen = ref(false);

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);
</script>

<template>
  <div class="w-screen h-14 bg-black bg-opacity-20">
    <div class="flex justify-center">
      <div class="px-4">
        <router-link to="/" class="nav-link">
          <img
            class="aspect-square h-10 inline mr-4 my-2"
            alt="Zelda RET logo"
            src="@/assets/img/logo.png"
          />
          <span class="text-white align-middle text-2xl font-bold mr-12">Zelda RET</span>
        </router-link>
        <div class="dropdown inline-block relative h-14">
          <span
            class="text-white inline-block align-sub text-lg cursor-pointer h-10"
            @click="toggleMenu"
          >
            Games
          </span>
          <div
            class="text-black menu absolute px-4 py-2 z-50 text-center -right-16 w-48 bg-white rounded-md"
            :class="menuOpen ? 'block' : 'hidden'"
          >
            <template v-for="game in games">
              <router-link
                :to="`/games/${game.slug}`"
                class="nav-link"
                @click="closeMenu"
              >
                <p class="font-semibold py-1">{{ game.title }}</p>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dropdown:hover .menu {
  display: block;
}
</style>
