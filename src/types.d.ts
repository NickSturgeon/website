declare interface Game {
  id: string;
  title: string;
  links: {
    name: string;
    icon: string;
    url: string;
  }[];
  faq: string;
  progress: ProgressData[];
}

declare interface ProgressData {
  name: string;
  title: string;
  data: {
    name: string;
    csv: string;
    defaultChartVisibility: boolean;
  }[];
  total: {
    name: string;
    index: number;
    description: string;
  };
  metrics: {
    name: string;
    index: number;
    description: string;
  }[];
}
