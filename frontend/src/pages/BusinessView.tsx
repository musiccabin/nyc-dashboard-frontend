import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../App.css'

import BarChart from "../components/charts/PlotlyBarChart"
import ScatterPlot from "../components/charts/ScatterPlot"
import  BoxPlot from '../components/charts/BoxPlot'
import Filters from "../components/filters/Filters"
import { predict } from "../ml/predict"

const App: React.FC = () => {
  const navigate = useNavigate();
  
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const mlPrediction = predict({ restaurant: selectedRestaurant, cuisine: selectedCuisine, day: selectedDay });

  return (
    <div className="p-6 space-y-8">
      <div className="mb-12 flex space-x-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/customer")}
        >
          I'm a Customer
        </button>
      </div>
      <h1 className="text-4xl font-bold">Business Dashboard</h1>
      <h2 className="text-3xl font-semibold mb-2 text-center">Key Metrics</h2>
      <div className="flex justify-center mb-6">
        <Filters
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">Cost Per Order ($)</h3>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="w-full md:w-1/2">
          <ScatterPlot
            x={[1, 2, 3, 4, 5]}
            y={[10, 15, 13, 17, 20]}
            xLabel="Order Total"
            yLabel="Delivery Time (min)"
          />
        </div>
        <div className="w-full md:w-1/2">
          <BoxPlot
            title="Box Plot Example"
            data={[
              {
                name: "Category A",
                y: [15, 18, 20, 22, 25, 30, 35],
              },
              {
                name: "Category B",
                y: [20, 25, 30, 35, 40, 50],
              },
            ]}
            xLabel='x'
            yLabel='y'
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-2 text-center">Food Prep Duration (Minutes)</h3>
          <BarChart
            x={["Mon", "Tue", "Wed", "Thu", "Fri"]}
            y={[120, 200, 150, 80, 170]}
            title="Orders per Day"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-2 text-center">Delivery Time (Minutes)</h3>
          <BarChart
            x={["Mon", "Tue", "Wed", "Thu", "Fri"]}
            y={[120, 200, 150, 80, 170]}
            title="Orders per Day"
          />
        </div>
      </div>
      <div className="text-lg font-semibold">
        ML Prediction: {mlPrediction}
      </div>
    </div>
  );
};

export default App
