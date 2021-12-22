<script setup lang="ts">
import { shallowRef, watch } from "vue";
import { Chart } from "highcharts-vue";
import { Options, PointOptionsObject } from "highcharts";
import { useStore } from "../../store";
import { cacheCSV, zip } from "../../utilities/helpers";

type Metric = [numerator: number, denominator: number, percent: number];
interface CustomPointOptionsObject extends PointOptionsObject {
  commit: string;
  metrics: Metric[];
}

const props = defineProps<{
  progress: ProgressData;
}>();

const store = useStore();

const options = shallowRef<Options>();
const useRelativeScale = shallowRef(true);

let showScaleButton = shallowRef(true);

let csv: string[] = [];
let data: CustomPointOptionsObject[][] = [];

watch(
  props,
  async () => {
    options.value = undefined;
    useRelativeScale.value = true;
    csv = await getCSV();
    data = await parseCSV();
    options.value = await getOptions();
  },
  { immediate: true }
);

watch(useRelativeScale, async () => (options.value = await getOptions()));

async function getCSV(): Promise<string[]> {
  return cacheCSV(
    store,
    props.progress.data.map((d) => d.csv)
  );
}

function changeScale() {
  useRelativeScale.value = !useRelativeScale.value;
}

function max(data: PointOptionsObject[][]): number {
  const y = data
    .flat()
    .flat()
    .map((d) => d.y!);
  return Math.max(...y);
}

async function parseCSV(): Promise<CustomPointOptionsObject[][]> {
  const results: CustomPointOptionsObject[][] = [];

  for (const data of csv) {
    const series: CustomPointOptionsObject[] = [];

    for (const points of data.split("\n").filter((line) => line != "")) {
      const point = points.split(",");

      const x = +point[1] * 1000; // timestamp
      const commit = point[2];

      let i = props.progress.total.index;
      const y = +point[i] / +point[i + 1]; // total percentage

      const metrics: Metric[] = [];
      for (const metric of props.progress.metrics) {
        i = metric.index;

        const numerator = +point[i];
        const denominator = +point[i + 1];
        const percent = numerator / denominator;

        metrics.push([numerator, denominator, percent]);
      }

      series.push({
        x: x,
        y: y,
        commit: commit,
        metrics: metrics,
      });
    }

    results.push(series);
  }

  return results;
}

async function getOptions(): Promise<Options> {
  const relativeScale = max(data);
  const totalScaleThreshold = 0.9;
  showScaleButton.value = relativeScale < totalScaleThreshold;

  const chartType = "area";
  return {
    chart: { type: chartType },
    title: { text: props.progress.name },
    tooltip: {
      formatter: function () {
        const opt = this.point.options! as CustomPointOptionsObject;
        let tooltip = "";

        tooltip += `Date: ${new Date(opt.x!).toLocaleString()}<br/>\n`;
        tooltip += `Commit: ${opt.commit}<br/>\n`;
        tooltip += `Total ${props.progress.total.name}: ${(opt.y! * 100).toFixed(
          2
        )}%<br/>\n`;

        if (props.progress.metrics.length > 0) {
          tooltip += `-------------------------------------------<br/>\n`;

          for (const metric of zip(props.progress.metrics, opt.metrics)) {
            const text = metric[0].description
              .replace("{0}", metric[1][0].toString())
              .replace("{1}", metric[1][1].toString())
              .replace("{2}", (+metric[1][2] * 100).toFixed(2));
            tooltip += `${text}<br/>\n`;
          }
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
      max: useRelativeScale.value && showScaleButton.value ? null : 1,
    },
    series: zip(props.progress.data, data).map((data, i) => ({
      type: chartType,
      name: data[0].name,
      data: data[1].sort((a, b) => a.x! - b.x!),
      visible: data[0].defaultChartVisibility,
      color:
        i > 0 || props.progress.data.length === 1
          ? "rgb(74, 222, 128)"
          : "rgb(250, 204, 21)",
    })),
  };
}
</script>

<template>
  <div class="rounded-sm bg-white h-chartHeight block relative">
    <transition
      enter-active-class="transition-opacity duration-200 ease"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease"
      leave-to-class="opacity-0"
    >
      <div v-if="options" class="rounded-sm absolute inset-0">
        <button
          v-if="showScaleButton"
          class="rounded-sm py-1 px-2 z-40 text-white absolute bottom-10 sm:bottom-2 left-2 text-xs bg-gray-500"
          @click="changeScale"
        >
          Scale: {{ useRelativeScale ? "Relative" : "Total" }}
        </button>
        <chart class="rounded-sm" :options="options"></chart>
      </div>
      <div
        v-else
        class="text-sm text-center inset-0 text-black"
        style="line-height: 400px"
      >
        <p class="animate-pulse">Loading...</p>
      </div>
    </transition>
  </div>
</template>
