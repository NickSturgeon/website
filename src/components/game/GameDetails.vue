<script setup lang="ts">
import { shallowRef, watchEffect } from "vue";
import N64Box from "@/components/common/N64Box.vue";
import ProgressInfo from "@/components/game/ProgressInfo.vue";
import ProgressChart from "@/components/game/ProgressChart.vue";

const props = defineProps<{ game: Game }>();

const matched = shallowRef("");
const unmatched = shallowRef("");

const showChart = shallowRef(false);

watchEffect(async () => {
  showChart.value = false;
  // [matched.value, unmatched.value] = ["", ""]; // Uncomment to show blank values between loads
  [matched.value, unmatched.value] = await updateCSV(props.game);
  showChart.value = true;
});

async function updateCSV(game: Game): Promise<[matched: string, unmatched: string]> {
  const m = fetch(`/csv/${game.matching}.csv`).then((res) => res.text());
  const um = fetch(`/csv/${game.nonmatching}.csv`).then((res) => res.text());
  return Promise.all([m, um]);
}
</script>

<template>
  <n64-box :file="1" heading="Project Progress">
    <progress-info :game="game" :matched="matched" :unmatched="unmatched" />
  </n64-box>
  <template v-for="chart in game.charts" :key="game.slug + chart.index">
    <n64-box simple>
      <div class="rounded-sm bg-white h-chartHeight block relative">
        <transition name="fade-chart">
          <progress-chart
            v-if="showChart"
            class="rounded-sm absolute inset-0"
            :metadata="chart"
            :matched="matched"
            :unmatched="unmatched"
          />
          <div
            v-else
            class="text-sm text-center inset-0 text-black"
            style="line-height: 400px"
          >
            <p class="animate-pulse">Loading...</p>
          </div>
        </transition>
      </div>
    </n64-box>
  </template>
</template>

<style>
.fade-chart-enter-active,
.fade-chart-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-chart-enter-from,
.fade-chart-leave-to {
  opacity: 0;
}
</style>
