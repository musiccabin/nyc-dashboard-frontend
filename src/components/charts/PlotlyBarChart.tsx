import React from "react"
import Plot from "react-plotly.js"
import type { Layout } from "plotly.js"

interface BarChartProps {
  x: string[];
  y: number[];
  title?: string;
}

const BarChart: React.FC<BarChartProps> = ({ x, y, title }) => {
  const layout: Partial<Layout> = {
    title: title ? { text: title } : undefined,
    xaxis: { title: { text: "Category" } },
    yaxis: { title: { text: "Value" } },
    autosize: true,
  };

  return (
    <Plot
      data={[
        {
          x,
          y,
          type: "bar",
          marker: { color: "#4f46e5" }, // Tailwind indigo-600
        },
      ]}
      layout={layout}
      style={{ width: "100%", height: "400px" }}
      useResizeHandler
    />
  );
};

export default BarChart