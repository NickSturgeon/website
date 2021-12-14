<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="text-white text-center w-screen h-14 bg-black bg-opacity-20 mt-4">
    <p class="text-lg mt-4">
      &copy; Zelda RET 2020-{{ currentYear }}. To contact us, please
      <a class="text-gold" href="#">join our Discord server</a>
    </p>
  </div>
</template>
