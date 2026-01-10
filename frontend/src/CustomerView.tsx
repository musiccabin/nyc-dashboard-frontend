import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import './App.css'

import BarChart from "./components/charts/BarChart"
import Filters from "./components/Filters"
import { predict } from "./ml/predict"

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
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={() => navigate("/business")}
        >
          I'm a Business
        </button>
      </div>
      <h1 className="text-3xl font-bold">Customer Dashboard</h1>

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

      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2 text-center">Top-Rated Restaurants</h2>
          <BarChart data={[30, 20, 10]} labels={["A", "B", "C"]} />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2 text-center">Order Fulfillment Time</h2>
          <BarChart data={[30, 20, 10]} labels={["A", "B", "C"]} />
        </div>
      </div>

      <div className="text-lg font-semibold">
        Calculate Wait Time {mlPrediction}
      </div>
    </div>
  );
};

export default App

