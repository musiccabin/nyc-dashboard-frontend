import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import BarChart from "./components/charts/BarChart";
// import BoxPlot from "./components/charts/BoxPlot";
// import ScatterPlot from "./components/charts/ScatterPlot";
import Filters from "./components/Filters";
import { predict } from "./ml/predict";

const App: React.FC = () => {
  // Example filter state
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Placeholder ML prediction
  const mlPrediction = predict({ restaurant: selectedRestaurant, cuisine: selectedCuisine, day: selectedDay });

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Business Insights</h1>
      <Filters
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={setSelectedCuisine}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />

      <BarChart data={[30, 20, 10]} labels={["A", "B", "C"]} />
      <BarChart data={[30, 20, 10]} labels={["A", "B", "C"]} />
      {/* <BoxPlot data={[5, 15, 25]} labels={["X", "Y", "Z"]} />
      <ScatterPlot data={[5, 15, 25]} labels={["X", "Y", "Z"]} /> */}

      <div className="text-lg font-semibold">
        ML Prediction: {mlPrediction}
      </div>
    </div>
  );
};

export default App;

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

