<script setup lang="ts">
import { ref, shallowRef, watchEffect } from "vue";

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
      const column = latestPoint.split(",");

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
  <strong class="key">Last updated</strong>
  <strong class="value date">{{ lastUpdate }}</strong>
  <br />

  <template v-if="totals.length > 0" v-for="(chart, i) in metrics">
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
  margin: 0 0.5em 0 1em;
}

.metric {
  min-width: 4em;
  text-align: right;
}

.matched {
  color: #01ce47;
  display: inline-block;
  min-width: 7ch;
  text-align: right;
}

.unmatched {
  color: #ffc107;
  display: inline-block;
  text-align: right;
}

.date {
  color: #00ffff;
}
</style>
