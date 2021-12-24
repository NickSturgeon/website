<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog as StatementDialogue,
  DialogOverlay,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import games from "../assets/json/games.json";
import md from "../assets/statement.md";

const statement = ref();
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

  <transition-root appear as="template" :show="showStatement">
    <statement-dialogue
      as="div"
      @close="showStatement = false"
      class="fixed inset-0 z-10 overflow-y-auto"
    >
      <div class="flex items-center justify-center min-h-screen">
        <transition-child
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <dialog-overlay class="fixed inset-0 bg-black opacity-30 rounded" />
        </transition-child>

        <transition-child
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <div class="relative w-full max-w-2xl p-6 bg-white rounded">
            <div class="flex justify-between">
              <dialog-title as="h2" class="text-xl font-bold leading-6 text-gray-900">
                {{ statement?.frontmatter?.title ?? "Statement" }}
              </dialog-title>
              <button @click="showStatement = false">
                <x-icon class="w-6 h-6 text-red-500" />
              </button>
            </div>

            <div class="mt-2">
              <md class="markdown text-black" ref="statement" />
              <p class="text-right mt-4">
                — {{ statement?.frontmatter?.signature ?? "ZeldaRET" }}
              </p>
            </div>
          </div>
        </transition-child>
      </div>
    </statement-dialogue>
  </transition-root>
</template>
