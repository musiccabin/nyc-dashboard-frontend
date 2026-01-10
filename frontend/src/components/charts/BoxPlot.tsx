import React from "react"
import Plot from "react-plotly.js"
import type { Layout, Data } from "plotly.js"

interface BoxPlotSeries {
  name: string
  y: number[]
}

interface BoxPlotProps {
  data: BoxPlotSeries[]
  title?: string;
  xLabel: string;
  yLabel: string;
}

const BoxPlot: React.FC<BoxPlotProps> = ({data, title, xLabel, yLabel}) => {
  const plotData: Partial<Data>[] = data.map(series => ({
    type: "box",
    name: series.name,
    y: series.y,
  }))

  const layout: Partial<Layout> = {
    title: { text: title },
    legend: {
      orientation: "h",
      x: 0.5,
      xanchor: "center",
      y: -0.2,
      yanchor: "top",
    },
  }

  return (
    <Plot
      data={plotData}
      layout={layout}
      useResizeHandler
      style={{ minWidth: "50%", height: "400px", marginBottom: 30 }}
    />
  )
}

export default BoxPlot