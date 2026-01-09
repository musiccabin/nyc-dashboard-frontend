import React from "react"
import _ChartJS from "chart.js/auto"
import { Bar } from "react-chartjs-2"

interface ChartProps {
  data: number[];
  labels: string[];
}

const BarChart: React.FC<ChartProps> = ({ data, labels }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Values",
        data,
        backgroundColor: "rgba(37, 99, 235)", // customer button (tailwind-bg-blue-600)
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      }
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart
