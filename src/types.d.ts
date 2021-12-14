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
