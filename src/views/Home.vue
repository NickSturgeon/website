<script setup lang="ts">
import { ref } from "vue";
import Statement from "../components/Statement.vue";
import games from "../assets/json/games.json";

const showStatement = ref(false);
</script>

<template>
  <div>
    <h1 class="text-white text-3xl font-bold mt-10">Zelda Reverse Engineering Team</h1>
    <div class="flex items-center justify-center">
      <button
        type="button"
        @click="showStatement = true"
        class="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        View Statement
      </button>
    </div>
    <div>
      <div class="text-white" v-for="game in games" :key="game.id">
        <h1>{{ game.title }}</h1>
        <router-link :to="`/games/${game.id}`">Go to game...</router-link>
      </div>
    </div>
  </div>

  <statement v-model="showStatement" />
</template>
