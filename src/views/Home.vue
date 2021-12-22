<script setup lang="ts">
import games from "../assets/json/games.json";
</script>

<template>
  <div>
    <h1 class="text-white text-3xl font-bold mt-10">Zelda Reverse Engineering Team</h1>
    <div>
      <div class="text-white" v-for="game in games" :key="game.id">
        <h1>{{ game.title }}</h1>
        <router-link :to="`/games/${game.id}`">Go to game...</router-link>
      </div>
    </div>
  </div>
</template>
