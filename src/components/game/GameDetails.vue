<script setup lang="ts">
import { shallowRef, defineAsyncComponent, computed, watch } from "vue";
import N64Box from "../common/N64Box.vue";
import ProgressInfo from "./ProgressInfo.vue";
import ProgressChart from "./ProgressChart.vue";

const props = defineProps<{ game: Game }>();

const faq = shallowRef();
const hasFAQ = computed(() => props.game?.faq !== null && props.game.faq !== "");

watch(
  props,
  async (props) => {
    if (hasFAQ.value) {
      const md = await import(`../../assets/faq/${props.game.faq}.md`);
      faq.value = md.default;
    }
  },
  { immediate: true }
);
</script>

<template>
  <template v-for="(progress, i) in game.progress">
    <div class="mb-4 group max-w-3xl mx-auto">
      <n64-box :file="i + 1" :heading="progress.title">
        <progress-info :progress="progress" />
      </n64-box>
      <n64-box simple>
        <progress-chart :progress="progress" />
      </n64-box>
    </div>
  </template>
  <div class="max-w-3xl mx-auto">
    <n64-box
      v-if="hasFAQ"
      :file="game.progress.length + 1"
      heading="Frequently Asked Questions"
    >
      <component :is="faq" class="markdown" />
    </n64-box>
  </div>
</template>
