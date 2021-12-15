<script setup lang="ts">
import { shallowRef, watchEffect } from "vue";

interface KeyNumber {
  [key: string]: number[];
}

const props = defineProps<{
  game: Game;
  matched: string;
  unmatched: string;
}>();

const game = shallowRef<Game>();

const totals = shallowRef<KeyNumber[]>([]);
const metrics = shallowRef<KeyNumber[]>([]);
const lastUpdate = shallowRef("");

watchEffect(async () => {
  game.value = props.game;
  totals.value = [];
  metrics.value = [];
  [totals.value, metrics.value] = await parseData();
});

async function parseData(): Promise<[KeyNumber[], KeyNumber[]]> {
  return new Promise((resolve, _) => {
    const t: KeyNumber[] = [];
    const m: KeyNumber[] = [];
    lastUpdate.value = "";

    for (const _ of game.value!.charts) {
      m.push({});
    }

    for (const data of [props.matched, props.unmatched]) {
      const points = data.split("\n").filter((line) => line != "");
      const latestPoint = points[points.length - 1];
      const column = latestPoint?.split(",");

      if (column === undefined) continue;

      if (lastUpdate.value === "") {
        lastUpdate.value = new Date(+column[1] * 1000).toLocaleString();
      }

      for (const chart of game.value!.charts) {
        t.push({ [chart.series[0].metric]: [] });
      }

      let c = 0;
      for (const chart of game.value!.charts) {
        let i = chart.index;
        t[c][chart.series[0].metric].push(+column[i] / +column[i + 1]);
        i += 2;

        for (const serie of chart.series.slice(1)) {
          if (!(serie.metric in m[c])) {
            m[c][serie.metric] = [];
          }
          m[c][serie.metric].push(+column[i] / +column[i + 1]);
          i += 2;
        }

        c += 1;
      }
    }

    resolve([t, m]);
  });
}
</script>

<template>
  <strong class="float-left">Last updated</strong>
  <strong class="float-right text-cyan-300">{{ lastUpdate }}</strong>
  <br />

  <template v-if="totals.length > 0" v-for="(chart, i) in metrics">
    <hr class="my-2 border border-border" />
    <strong class="float-left">Total {{ Object.keys(totals[i])[0] }}</strong>
    <template v-for="(total, j) in Object.values(totals[i])[0]">
      <strong class="float-right ml-4 mr-2" v-if="j > 0">|</strong>
      <strong
        class="float-right inline-block text-right w-metricWidth"
        :class="j === 0 ? 'text-green-400' : 'text-yellow-400'"
        >{{ (total * 100).toFixed(2) }}%</strong
      >
    </template>
    <br />
    <template v-for="(metric, key) in chart">
      <strong class="float-left">{{ key }}</strong>
      <template v-for="(val, j) in metric">
        <strong class="float-right ml-4 mr-2" v-if="j > 0">|</strong>
        <strong
          class="float-right inline-block text-right w-metricWidth"
          :class="j === 0 ? 'text-green-400' : 'text-yellow-400'"
          >{{ (val * 100).toFixed(2) }}%</strong
        >
      </template>
      <br />
    </template>
  </template>
</template>
