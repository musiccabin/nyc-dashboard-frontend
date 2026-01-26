import React from "react"
import { cuisineOptions } from "../constants/customerView"
interface FilterProps {
  selectedCuisines: string[]
  setSelectedCuisines: (val: string[]) => void
  selectedRating: number
  setSelectedRating: (val: number) => void
  selectedCost: number
  setSelectedCost: (val: number) => void
}

const Filters: React.FC<FilterProps> = ({
  selectedCuisines, setSelectedCuisines,
  selectedRating, setSelectedRating,
  selectedCost, setSelectedCost
}: FilterProps) => {

  return (
    <div className="flex flex-col gap-4 p-8 sticky top-0 h-screen overflow-auto">
      {/* Rating */}
      <div>
        <span className="font-semibold">Rating</span>
        <input
          type="range"
          min={4}
          max={5}
          step={0.1}
          value={selectedRating}
          onChange={e => setSelectedRating(Number(e.target.value))}
          className="w-full mt-1"
        />
        <div className="text-sm mt-1">{selectedRating}⭐ & up</div>
      </div>

      {/* Cost */}
      <div>
        <span className="font-semibold">Cost ($)</span>
        <input
          type="range"
          min={20}
          max={60}
          step={10}
          value={selectedCost}
          onChange={e => setSelectedCost(Number(e.target.value))}
          className="w-full mt-1"
        />
        <div className="text-sm mt-1">Up to ${selectedCost}</div>
      </div>

      {/* Cuisine */}
      <div>
        <span className="font-semibold">Cuisine</span>
        <div className="flex gap-2 mt-1">
          <button
            className="text-sm px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => setSelectedCuisines([])}
          >
            Clear all
          </button>

          <button
            className="text-sm px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => setSelectedCuisines(cuisineOptions)}
          >
            Select all
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {cuisineOptions.map(c => (
            <button
              key={c}
              className={`text-sm px-3 py-1 border rounded ${
                selectedCuisines.includes(c) ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => {
                if (selectedCuisines.includes(c)) {
                  // Deselect
                  setSelectedCuisines(selectedCuisines.filter(x => x !== c))
                } else {
                  // Select
                  setSelectedCuisines([...selectedCuisines, c])
                }
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filters
