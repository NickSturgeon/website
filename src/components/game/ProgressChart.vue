<script setup lang="ts">
import { ref, Ref, onUpdated } from "vue";
import { Chart } from "highcharts-vue";
import { Options, PointOptionsObject } from "highcharts";
import { ChartData, CustomPointOptionsObject } from "../../env";

const props = defineProps<{
  metadata: ChartData;
  matched: string;
  unmatched: string;
}>();

// --- SETUP ---
const metadata = ref(props.metadata);
const matchedData = ref(parseData(props.matched));
const unmatchedData = ref(parseData(props.unmatched));

const interval = 1 / 5;
let joined = Array.prototype
  .concat(matchedData.value, unmatchedData.value)
  .sort((a, b) => a["y"] - b["y"]);
let max = Math.max(interval, Math.ceil(joined.slice(-1)[0].y / interval) * interval);

const opt: Ref<Options> = ref(getOptions());

// --- LIFECYCLE ---
onUpdated(() => {
  metadata.value = props.metadata;
  matchedData.value = parseData(props.matched);
  unmatchedData.value = parseData(props.unmatched);
  joined = Array.prototype
    .concat(matchedData, unmatchedData)
    .sort((a, b) => a["y"] - b["y"]);
  max = Math.max(interval, Math.ceil(joined.slice(-1)[0].y / interval) * interval);
  opt.value = getOptions();
});

// --- FUNCTIONS ---
function parseData(data: string): PointOptionsObject[] {
  const seriesData = [];

  for (const line of data.split("\n").filter((line) => line != "")) {
    const columns = line.split(",");

    const x = +columns[1] * 1000; // timestamp
    const commit = columns[2];

    let i = metadata.value.index;
    const y = +columns[i] / +columns[i + 1]; // total percentage
    i += 2;

    const metrics = [];
    for (const _ in metadata.value.series.slice(1)) {
      const numerator = +columns[i];
      const denominator = +columns[i + 1];
      const percent = numerator / denominator;

      metrics.push([numerator, denominator, percent]); // params for the description string
      i += 2;
    }

    seriesData.push({
      x: x,
      y: y,
      commit: commit,
      metrics: metrics,
    });
  }

  return seriesData;
}

function getOptions(): Options {
  return {
    chart: { type: "line" },
    title: { text: metadata.value.title },
    subtitle: { text: metadata.value.subtitle },
    tooltip: {
      formatter: function () {
        const opt = this.point.options! as CustomPointOptionsObject;
        let tooltip = "";

        tooltip += `Date: ${new Date(opt.x!).toLocaleString()}<br/>\n`;
        tooltip += `Commit: ${opt.commit}<br/>\n`;
        tooltip += `Total ${metadata.value.series[0].metric}: ${(opt.y! * 100).toFixed(
          2
        )}%<br/>\n`;
        tooltip += `-------------------------------------------<br/>\n`;

        for (let i = 0; i < metadata.value.series.length - 1; i += 1) {
          const text = metadata.value.series[i + 1].description
            .replace("{0}", opt.metrics[i][0].toString())
            .replace("{1}", opt.metrics[i][1].toString())
            .replace("{2}", (+opt.metrics[i][2] * 100).toFixed(2));
          tooltip += `${text}<br/>\n`;
        }

        return tooltip;
      },
    },
    xAxis: {
      title: { text: "Date" },
      type: "datetime",
    },
    yAxis: {
      title: { text: "Completion (%)" },
      labels: {
        formatter: function () {
          return `${(+this.value * 100).toFixed(2)}%`;
        },
      },
      max: max,
    },
    series: [
      {
        type: "line",
        name: "Non-matched",
        data: unmatchedData.value,
        color: "#ffc107",
      },
      {
        type: "line",
        name: "Matched",
        data: matchedData.value,
        color: "#01ce47",
      },
    ],
  };
}
</script>

<template>
  <chart :options="opt"></chart>
</template>
