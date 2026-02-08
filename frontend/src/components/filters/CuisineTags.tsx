import { cuisineOptions } from "../../constants/customerView"

interface CuisineTagsProps {
  selectedCuisines: string[]
  setSelectedCuisines: (value: string[]) => void
}

export function CuisineTags({ selectedCuisines, setSelectedCuisines }: CuisineTagsProps) {
  return (
      <div className="flex flex-col items-center gap-4">
        <span className="font-semibold text-xl">Cuisine Types</span>
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
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {cuisineOptions.map(c => (
            <button
              key={c}
              className={`text-sm px-3 py-1 border rounded ${
                selectedCuisines.includes(c) ? "bg-teal-500 text-white hover:bg-teal-600 transition" : "bg-white text-gray-700 hover:bg-gray-50 transition"
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
  )
}