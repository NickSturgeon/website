<script setup lang="ts">
import linker from "../../assets/img/linker.png";

const props = defineProps<{
  simple?: boolean;
  file?: number;
  heading?: string;
}>();
</script>

<template>
  <section class="n64-box max-w-3xl m-auto box-border text-white relative">
    <template v-if="!props.simple">
      <header>
        <div
          class="box slot text-right pr-9 text-2xl relative font-semibold cursor-default text-slate-900 p-3 w-32"
        >
          File {{ props.file }}
          <img class="absolute h-12 -right-10 bottom-1.5" :src="linker" />
        </div>
        <div
          class="box border-r-solid border-l-solid border-t-solid border-b-none p-3 w-auto h-10 flex-grow box-content text-2xl rounded-b-none"
        >
          <div class="pl-6">{{ props.heading }}</div>
          <hr />
        </div>
      </header>

      <!-- Hack to get the staggered border -->
      <div
        class="box hack-slot box-content border-r-none border-b-none rounded-b-none rounded-r-none float-left h-0 p-0 w-32"
      ></div>
      <div
        class="box hack-heading border-t-none border-b-none border-l-none ml-32 rounded-none p-0 relative w-auto"
      ></div>
    </template>
    <article
      class="box border-r-solid border-l-solid border-b-solid border-t-none p-4 w-full rounded-t-none"
    >
      <slot></slot>
    </article>
  </section>
</template>
