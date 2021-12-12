<script setup lang="ts">
import { ref } from "vue";
import { Game } from "../../env";
import _404Vue from "../../views/_404.vue";

const props = defineProps<{
  game: Game;
  matched: string;
  unmatched: string;
}>();

// --- SETUP ---
const totals = ref<{ [key: string]: number[] }[]>([]);
const metrics = ref<{ [key: string]: number[] }[]>([]);
const lastUpdate = ref<string>();

parseData();

// --- FUNCTIONS ---
function parseData(): void {
  totals.value = [];
  metrics.value = [];

  for (const _ of props.game.charts) {
    metrics.value.push({});
  }

  for (const data of [props.matched, props.unmatched]) {
    const points = data.split("\n").filter((line) => line != "");
    const latestPoint = points[points.length - 1];
    const column = latestPoint.split(",");

    if (lastUpdate.value === undefined) {
      lastUpdate.value = new Date(+column[1] * 1000).toLocaleString();
    }

    for (const chart of props.game.charts) {
      totals.value.push({ [chart.series[0].metric]: [] });
    }

    let c = 0;
    for (const chart of props.game.charts) {
      let i = chart.index;
      totals.value[c][chart.series[0].metric].push(+column[i] / +column[i + 1]);
      i += 2;

      for (const serie of chart.series.slice(1)) {
        if (!(serie.metric in metrics.value[c])) {
          metrics.value[c][serie.metric] = [];
        }
        metrics.value[c][serie.metric].push(+column[i] / +column[i + 1]);
        i += 2;
      }

      c += 1;
    }
  }
}
</script>

<template>
  <strong class="key">Last updated</strong>
  <strong class="value date">{{ lastUpdate }}</strong>
  <br />

  <template v-for="(chart, i) in metrics">
    <hr class="my-2" />
    <strong class="key">Total {{ Object.keys(totals[i])[0] }}</strong>
    <template v-for="(total, j) in Object.values(totals[i])[0]">
      <strong class="value separator" v-if="j > 0">|</strong>
      <strong class="value" :class="j === 0 ? 'matched' : 'unmatched'"
        >{{ (total * 100).toFixed(2) }}%</strong
      >
    </template>
    <br />
    <template v-for="(metric, key) in chart">
      <strong class="key">{{ key }}</strong>
      <template v-for="(val, j) in metric">
        <strong class="value separator" v-if="j > 0">|</strong>
        <strong class="value" :class="j === 0 ? 'matched' : 'unmatched'"
          >{{ (val * 100).toFixed(2) }}%</strong
        >
      </template>
      <br />
    </template>
  </template>
</template>

<style scoped>
hr {
  border-color: #1c2a49;
  border-width: 1px;
}

.key {
  float: left;
}

.value {
  float: right;
}

.separator {
  margin: 0 0.5em;
}

.metric {
  min-width: 4em;
  text-align: right;
}

.matched {
  color: #01ce47;
}

.unmatched {
  color: #ffc107;
}

.date {
  color: #00ffff;
}
</style>
