<script setup lang="ts">
import { shallowRef, watchEffect } from "vue";
import { Chart } from "highcharts-vue";
import { Options, PointOptionsObject } from "highcharts";

type Metric = [numerator: number, denominator: number, percent: number];
interface CustomPointOptionsObject extends PointOptionsObject {
  commit: string;
  metrics: Metric[];
}

const props = defineProps<{
  metadata: ChartData;
  matched: string;
  unmatched: string;
}>();

const options = shallowRef<Options>();

watchEffect(() => {
  const matchedData = parseData(props.matched, props.metadata);
  const unmatchedData = parseData(props.unmatched, props.metadata);
  options.value = getOptions(matchedData, unmatchedData, props.metadata);
});

function max(matched: PointOptionsObject[], unmatched: PointOptionsObject[]): number {
  const interval = 1 / 5;
  const joined = Array.prototype
    .concat(matched, unmatched)
    .sort((a, b) => a["y"] - b["y"]);
  return Math.max(interval, Math.ceil(joined.slice(-1)[0].y / interval) * interval);
}

function parseData(data: string, metadata: ChartData): PointOptionsObject[] {
  const seriesData: CustomPointOptionsObject[] = [];

  for (const line of data.split("\n").filter((line) => line != "")) {
    const columns = line.split(",");

    const x = +columns[1] * 1000; // timestamp
    const commit = columns[2];

    let i = metadata.index;
    const y = +columns[i] / +columns[i + 1]; // total percentage
    i += 2;

    const metrics: Metric[] = [];
    for (const _ in metadata.series.slice(1)) {
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

function getOptions(
  matched: PointOptionsObject[],
  unmatched: PointOptionsObject[],
  metadata: ChartData
): Options {
  return {
    chart: { type: "line" },
    title: { text: metadata.title },
    subtitle: { text: metadata.subtitle },
    tooltip: {
      formatter: function () {
        const opt = this.point.options! as CustomPointOptionsObject;
        let tooltip = "";

        tooltip += `Date: ${new Date(opt.x!).toLocaleString()}<br/>\n`;
        tooltip += `Commit: ${opt.commit}<br/>\n`;
        tooltip += `Total ${metadata.series[0].metric}: ${(opt.y! * 100).toFixed(
          2
        )}%<br/>\n`;
        tooltip += `-------------------------------------------<br/>\n`;

        for (let i = 0; i < metadata.series.length - 1; i += 1) {
          const text = metadata.series[i + 1].description
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
      max: max(matched, unmatched),
    },
    series: [
      {
        type: "line",
        name: "Non-matched",
        data: unmatched,
        color: "#ffc107",
      },
      {
        type: "line",
        name: "Matched",
        data: matched,
        color: "#01ce47",
      },
    ],
  };
}
</script>

<template>
  <chart :options="options"></chart>
</template>
