<template>
  <div class="w-screen h-14 bg-black bg-opacity-20">
    <div class="flex justify-center">
      <div class="px-4">
        <router-link to="/" class="nav-link">
          <img
            class="aspect-square h-10 inline mr-4 my-2"
            alt="Zelda RET logo"
            src="../../assets/img/logo.png"
          />
          <span class="text-white align-middle text-2xl font-bold mr-12">Zelda RET</span>
        </router-link>
        <router-link to="/games/mm" class="nav-link">
          <span class="text-white align-sub text-lg font-bold mr-64">Games</span>
        </router-link>
        <a href="https://discord.zelda64.dev/" target="_blank">
          <img
            class="aspect-square w-6 inline"
            alt="Discord logo"
            src="../../assets/img/icons/discord.png"
          />
        </a>
      </div>
    </div>
  </div>
</template>
