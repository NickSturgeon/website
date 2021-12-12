/// <reference types="vite/client" />

import { DefineComponent, ComponentOptions } from "vue";
import { PointOptionsObject } from "highcharts";

declare module "*.vue" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.md" {
  const component: ComponentOptions;
  export default component;
}

declare interface Game {
  slug: string;
  title: string;
  faq: string;
  links: { [type: string]: string };
  matching: string;
  nonmatching: string;
  charts: ChartData[];
}

declare interface ChartData {
  title: string;
  subtitle: string;
  index: number;
  series: { metric: string; description: string }[];
}

declare interface CustomPointOptionsObject extends PointOptionsObject {
  commit: string;
  metrics: { [key: string]: number[] }[];
}
