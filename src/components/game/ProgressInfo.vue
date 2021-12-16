<script setup lang="ts">
import { shallowRef, watchEffect } from "vue";

interface KeyNumber {
  [key: string]: (number | undefined)[];
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
    const totals: KeyNumber[] = [];
    const metrics: KeyNumber[] = [];
    lastUpdate.value = "";

    for (const _ of game.value!.charts) {
      metrics.push({});
    }

    for (const data of [props.matched, props.unmatched]) {
      const points = data.split("\n").filter((line) => line != "");
      const latestPoint = points[points.length - 1];
      const column = latestPoint?.split(",");

      if (column === undefined) {
        lastUpdate.value = "Loading...";
      } else if (lastUpdate.value === "") {
        lastUpdate.value = new Date(+column[1] * 1000).toLocaleString();
      }

      for (const chart of game.value!.charts) {
        totals.push({ [chart.series[0].metric]: [] });
      }

      let c = 0;
      for (const chart of game.value!.charts) {
        let i = chart.index;
        const total = column === undefined ? undefined : +column[i] / +column[i + 1];
        totals[c][chart.series[0].metric].push(total);
        i += 2;

        for (const serie of chart.series.slice(1)) {
          const total = column === undefined ? undefined : +column[i] / +column[i + 1];
          if (!(serie.metric in metrics[c])) {
            metrics[c][serie.metric] = [];
          }
          metrics[c][serie.metric].push(total);
          i += 2;
        }

        c += 1;
      }
    }

    resolve([totals, metrics]);
  });
}
</script>

<template>
  <strong class="float-left">Last updated</strong>
  <strong class="float-right text-cyan-300">{{ lastUpdate }}</strong>
  <br />

  <template v-for="(chart, i) in metrics">
    <hr class="my-2 border border-border" />
    <strong class="float-left">Total {{ Object.keys(totals[i])[0] }}</strong>
    <template v-for="(total, j) in Object.values(totals[i])[0]">
      <strong
        class="float-right inline-block text-right w-28"
        :class="j === 0 ? 'text-green-400' : 'text-yellow-400'"
      >
        <span v-if="total === undefined">&mdash;&emsp;&percnt;</span>
        <div v-else>{{ (total * 100).toFixed(2) }}%</div>
      </strong>
    </template>
    <br />
    <template v-for="(metric, key) in chart">
      <span class="float-left">{{ key }}</span>
      <template v-for="(val, j) in metric">
        <span
          class="float-right inline-block text-right w-28"
          :class="j === 0 ? 'text-green-400' : 'text-yellow-400'"
        >
          <span v-if="val === undefined">&mdash;&emsp;&percnt;</span>
          <span v-else>{{ (val * 100).toFixed(2) }}%</span></span
        >
      </template>
      <br />
    </template>
  </template>
</template>
