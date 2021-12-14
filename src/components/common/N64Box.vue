<script setup lang="ts">
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
        <div class="box slot text-center text-2xl cursor-default text-black p-3 w-28">
          File {{ props.file }}
        </div>
        <div
          class="box border-r-solid border-l-solid border-t-solid border-b-none p-3 w-auto h-10 flex-grow box-content text-2xl rounded-b-none"
        >
          {{ props.heading }}
          <hr />
        </div>
      </header>

      <!-- Hack to get the staggered border -->
      <div
        class="box hack-slot box-content border-r-none border-b-none rounded-b-none rounded-r-none float-left h-0 p-0 w-28"
      ></div>
      <div
        class="box hack-heading border-t-none border-b-none border-l-none ml-28 rounded-none p-0 relative w-auto"
      ></div>
    </template>
    <article
      class="box border-r-solid border-l-solid border-b-solid border-t-none p-4 w-full rounded-t-none"
    >
      <slot></slot>
    </article>
  </section>
</template>
