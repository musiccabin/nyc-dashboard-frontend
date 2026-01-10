import React from "react";
import Plot from "react-plotly.js";
import type { Layout } from "plotly.js";

interface ScatterPlotProps {
  x: number[];
  y: number[];
  xLabel: string;
  yLabel: string;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ x, y, xLabel, yLabel }) => {
  const layout: Partial<Layout> = {
    title: { text: "Scatter Plot", font: { size: 20, color: "#111827" } },
    xaxis: { title: { text: xLabel } },
    yaxis: { title: { text: yLabel } },
    font: { color: "#111827" },
    autosize: true,
  };

  return (
    <Plot
      data={[
        {
          x,
          y,
          mode: "markers",
          type: "scatter",
          marker: { color: "#4f46e5", size: 10 },
        },
      ]}
      layout={layout}
      style={{ maxWidth: "100%", height: "400px" }}
      useResizeHandler
    />
  );
};

export default ScatterPlot;
