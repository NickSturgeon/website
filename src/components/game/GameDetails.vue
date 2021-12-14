<script setup lang="ts">
import { shallowRef, watchEffect } from "vue";
import N64Box from "../common/N64Box.vue";
import ProgressInfo from "./ProgressInfo.vue";
import ProgressChart from "./ProgressChart.vue";

const props = defineProps<{ game: Game }>();

const matched = shallowRef<string>();
const unmatched = shallowRef<string>();

const showChart = shallowRef(false);

watchEffect(async () => {
  showChart.value = false;
  [matched.value, unmatched.value] = await updateCSV(props.game);
  showChart.value = true;
});

async function updateCSV(game: Game): Promise<[string, string]> {
  const m = fetch(`/csv/${game.matching}.csv`).then((res) => res.text());
  const um = fetch(`/csv/${game.nonmatching}.csv`).then((res) => res.text());

  return Promise.all([m, um]);
}
</script>

<template>
  <n64-box :file="1" heading="Project Progress">
    <progress-info :game="props.game" :matched="matched!" :unmatched="unmatched!" />
  </n64-box>
  <template v-for="chart in props.game.charts" :key="props.game.slug + chart.index">
    <n64-box simple>
      <progress-chart
        v-if="showChart"
        :metadata="chart"
        :matched="matched!"
        :unmatched="unmatched!"
      />
      <div style="display: block; background-color: white; height: 400px" v-else>
        Loading...
      </div>
    </n64-box>
  </template>
</template>
