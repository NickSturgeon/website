<script setup lang="ts">
import { ref, onUpdated } from "vue";
import { Game } from "../../env";
import N64Box from "../N64Box.vue";
import ProgressInfo from "./ProgressInfo.vue";
import ProgressChart from "./ProgressChart.vue";

const props = defineProps<{ game: Game }>();

// --- SETUP ---
const charts = ref(props.game.charts);
const matched = ref<string>();
const unmatched = ref<string>();

getCSV();

// --- LIFECYCLE ---
onUpdated(() => {
  matched.value = undefined;
  unmatched.value = undefined;
  getCSV();
  charts.value = props.game.charts;
});

// --- FUNCTIONS ---
function getCSV(): void {
  fetch(`/csv/${props.game.matching}.csv`).then(async (res) => {
    matched.value = await res.text();
  });
  fetch(`/csv/${props.game.nonmatching}.csv`).then(async (res) => {
    unmatched.value = await res.text();
  });
}
</script>

<template>
  <n64-box :file="1" heading="Project Progress">
    <progress-info
      v-if="matched !== undefined && unmatched !== undefined"
      :game="props.game"
      :matched="matched"
      :unmatched="unmatched"
    />
    <span class="text-sm" v-else>Loading...</span>
  </n64-box>
  <template v-for="chart in charts" :key="chart.title + chart.index">
    <n64-box simple>
      <progress-chart
        v-if="matched !== undefined && unmatched !== undefined"
        :metadata="chart"
        :matched="matched"
        :unmatched="unmatched"
      />
      <span class="text-sm" v-else>Loading...</span>
    </n64-box>
  </template>
</template>
