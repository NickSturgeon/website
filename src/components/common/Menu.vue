<script setup lang="ts">
import { Menu as MenuDropdown, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

import games from "../../assets/json/games.json";
</script>

<template>
  <div class="w-full h-14 bg-black bg-opacity-20">
    <div class="flex justify-center">
      <div class="px-4">
        <router-link to="/" class="nav-link">
          <img
            class="aspect-square h-10 inline mr-4 my-2"
            alt="ZeldaRET logo"
            src="../../assets/img/logo.png"
          />
          <span class="text-white align-middle text-2xl font-bold mr-12">ZeldaRET</span>
        </router-link>
        <menu-dropdown as="div" class="relative inline-block">
          <menu-button
            class="inline-flex items-center justify-center w-full text-white text-lg bg-slate-400 bg-opacity-10 hover:bg-opacity-20 rounded-sm px-4 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Games
            <chevron-down-icon
              class="w-5 h-5 ml-2 -mr-1 mt-0.5 text-white"
              aria-hidden="true"
            />
          </menu-button>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <menu-items
              class="text-black p-1 mt-1 z-50 text-left w-48 absolute right-0 origin-top-right bg-white rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <template v-for="game in games">
                <menu-item v-slot="{ active }">
                  <router-link :to="`/games/${game.id}`" class="nav-link">
                    <p
                      class="font-semibold p-2"
                      :class="active ? 'bg-purple text-white rounded-sm' : ''"
                    >
                      {{ game.title }}
                    </p>
                  </router-link>
                </menu-item>
              </template>
            </menu-items>
          </transition>
        </menu-dropdown>
      </div>
    </div>
  </div>
</template>
