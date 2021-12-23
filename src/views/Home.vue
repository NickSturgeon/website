<script setup lang="ts">
import { ref } from "vue";
import { Dialog as StatementDialogue, DialogOverlay, DialogTitle } from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import games from "../assets/json/games.json";
import md from "../assets/statement.md";

const statement = ref();
const viewStatement = ref(false);
</script>

<template>
  <div>
    <h1 class="text-white text-3xl font-bold mt-10">Zelda Reverse Engineering Team</h1>
    <div class="flex items-center justify-center">
      <button
        type="button"
        @click="viewStatement = true"
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

  <statement-dialogue
    :open="viewStatement"
    :initial-focus="null"
    @close="viewStatement = false"
    class="fixed inset-x-0 inset-y-20 shadow-md w-full max-w-xl mx-auto z-10 overflow-y-auto p-8 bg-white rounded-md"
  >
    <teleport :to="'body'">
      <dialog-overlay class="fixed transform inset-0 bg-black opacity-50" />
    </teleport>

    <div class="flex justify-between">
      <dialog-title as="h2" class="text-xl font-bold leading-6 text-gray-900">
        {{ statement?.frontmatter?.title ?? "Statement" }}
      </dialog-title>
      <button @click="viewStatement = false">
        <x-icon class="w-6 h-6 text-red-500" />
      </button>
    </div>

    <div class="mt-2">
      <md class="markdown text-black" ref="statement" />
      <p class="text-right mt-4">
        — {{ statement?.frontmatter?.signature ?? "ZeldaRET" }}
      </p>
    </div>
  </statement-dialogue>
</template>
