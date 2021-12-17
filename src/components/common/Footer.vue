<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <div
    class="text-white flex justify-center items-center w-screen h-14 bg-black bg-opacity-20 mt-4"
  >
    <p class="text-lg mx-2">&copy; Zelda RET 2020-{{ currentYear }}</p>
    <div class="flex mx-2">
      <a href="https://discord.zelda64.dev" target="_blank" title="Discord">
        <img class="h-6 mx-2" src="../../assets/img/icons/discord.png" />
      </a>
      <a href="https://github.com/zeldaret" target="_blank" title="Github">
        <img class="h-6 mx-2" src="../../assets/img/icons/github.png" />
      </a>
    </div>
  </div>
</template>
