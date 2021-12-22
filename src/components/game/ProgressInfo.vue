<script setup lang="ts">
import { ref, shallowRef, watch } from "vue";
import { useStore } from "../../store";
import { cacheCSV } from "../../utilities/helpers";

interface Metric {
  name: string;
  values: number[];
}

const props = defineProps<{
  progress: ProgressData;
}>();

const store = useStore();

const lastUpdate = shallowRef<Date>();
const total = ref<Metric>();
const metrics = ref<Metric[]>([]);

watch(
  props,
  async (props) => {
    const csv = await getCSV(props.progress);
    await parseCSV(csv);
  },
  { immediate: true }
);

async function getCSV(progress: ProgressData): Promise<string[]> {
  return cacheCSV(
    store,
    progress.data.map((d) => d.csv)
  );
}

async function parseCSV(csv: string[]): Promise<void> {
  lastUpdate.value = undefined;
  total.value = { name: props.progress.total.name, values: [] };
  metrics.value = props.progress.metrics.map((m) => ({
    name: m.name,
    values: [],
  }));

  for (const data of csv) {
    const point = await getLatestPoint(data);
    const percentage = (index: number) => +point[index] / +point[index + 1];

    const update = new Date(+point[1] * 1000);
    if (
      lastUpdate.value === undefined ||
      lastUpdate.value?.getTime() < update.getTime()
    ) {
      lastUpdate.value = update;
    }

    let index = props.progress.total.index;
    total.value.values.push(percentage(index));

    for (const metric of props.progress.metrics) {
      metrics.value
        .find((m) => metric.name === m.name)!
        .values.push(percentage(metric.index));
    }
  }
}

async function getLatestPoint(csv: string): Promise<string[]> {
  const points = csv.split("\n").filter((line) => line != "");
  return points.pop()?.split(",") ?? [];
}
</script>

<template>
  <div class="flex justify-between">
    <span class="font-bold">Last Updated</span>
    <span class="text-white font-bold text-right">{{
      lastUpdate?.toLocaleString() ?? "Unknown"
    }}</span>
  </div>

  <hr class="my-2 border border-border" />

  <table class="w-full">
    <thead>
      <tr>
        <th class="text-left align-bottom underline sm:w-1/2 md:w-3/5">
          {{ total?.name }}
        </th>
        <template v-for="(name, i) of progress.data.map((d) => d.name)">
          <th
            class="text-right align-bottom underline sm:w-1/4 md:w-1/5"
            :class="
              i > 0 || total?.values.length === 1 ? 'text-green-400' : 'text-yellow-400'
            "
          >
            {{ name }}
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-bold">Total</td>
        <template v-for="(value, i) in total?.values">
          <td
            class="text-right font-bold"
            :class="
              i > 0 || total?.values.length === 1 ? 'text-green-400' : 'text-yellow-400'
            "
          >
            <span v-if="value === undefined">&mdash;&emsp;&percnt;</span>
            <span v-else>{{ (value * 100).toFixed(2) }}%</span>
          </td>
        </template>
      </tr>
      <tr v-for="metric in metrics">
        <td>{{ metric.name }}</td>
        <template v-for="(value, i) in metric.values">
          <td
            class="text-right"
            :class="
              i > 0 || total?.values.length === 1 ? 'text-green-400' : 'text-yellow-400'
            "
          >
            <span v-if="value === undefined">&mdash;&emsp;&percnt;</span>
            <span v-else>{{ (value * 100).toFixed(2) }}%</span>
          </td>
        </template>
        <br />
      </tr>
    </tbody>
  </table>
</template>
