<script setup lang="ts">
import { shallowRef, onBeforeMount, onUpdated } from "vue";
import { useStore } from "../../store";
import N64Box from "@/components/common/N64Box.vue";
import ProgressInfo from "@/components/game/ProgressInfo.vue";
import ProgressChart from "@/components/game/ProgressChart.vue";

const props = defineProps<{ game: Game }>();
const store = useStore();

const matched = shallowRef("");
const unmatched = shallowRef("");

const showChart = shallowRef(false);

onBeforeMount(async () => {
  [matched.value, unmatched.value] = await updateCSV([
    props.game.matching,
    props.game.nonmatching,
  ]);
  showChart.value = true;
});

onUpdated(async () => {
  showChart.value = false;
  [matched.value, unmatched.value] = await updateCSV([
    props.game.matching,
    props.game.nonmatching,
  ]);
  showChart.value = true;
});

async function updateCSV(keys: string[]): Promise<string[]> {
  const results: Promise<string>[] = [];
  keys.forEach((key) => results.push(store.dispatch("getSetCsvCache", key)));
  return Promise.all(results);
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
