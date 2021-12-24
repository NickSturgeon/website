<script setup lang="ts">
import { ref } from "vue";
import Statement from "../components/Statement.vue";
import games from "../assets/json/games.json";

const showStatement = ref(false);
</script>

<template>
  <div>
    <h1 class="text-white text-3xl text-center font-bold mt-10">
      Zelda Reverse Engineering Team
    </h1>
    <div class="my-8">
      <p class="text-center text-white font-semibold text-xl mb-2">NEWS</p>
      <div class="flex items-center justify-center">
        <p class="text-lg text-white mr-4">OoT Has Reach 100%:</p>
        <button
          type="button"
          @click="showStatement = true"
          class="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          View Statement
        </button>
      </div>
    </div>
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 md:px-0">
      <template v-for="game in games" :key="game.id">
        <div class="grid text-white rounded border-white border-2 p-4">
          <router-link class="nav-link" :to="`/games/${game.id}`">
            <h1 class="col-span-2">{{ game.title }}</h1>
          </router-link>
          <p
            class="row-span-2 text-right align-middle h-full font-semibold text-2xl transition-transform hover:scale-125 hover:-translate-x-5"
          >
            26.3%
          </p>
          <span class="col-span-2"
            ><a :href="game.links[0].url" target="_blank">GitHub</a></span
          >
        </div>
      </template>
    </div>

    <statement v-model="showStatement" />
  </div>
</template>
