declare module "chart.js" {
  interface ChartTypeRegistry {
    boxplot: {
      chartOptions: ChartOptions<"boxplot">;
      datasetOptions: ChartDataset<"boxplot">;
      defaultDataPoint: number[];
      parsedDataType: unknown;
      scales: keyof ChartTypeRegistry["bar"]["scales"];
    };
  }
}
