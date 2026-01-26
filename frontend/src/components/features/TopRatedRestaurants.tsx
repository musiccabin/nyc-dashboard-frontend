import React, { useState } from "react"
import { useTopRatedRestaurants } from "../../hooks/useTopRatedRestaurants"

import { RestaurantTable } from "../tables/RestaurantTable"
import Filters from "../../components/Filters"
import { SortControls } from "../SortControls"

const TopRatedRestaurants: React.FC = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Filter and sort restaurants by user command
  const {
    data: sortedRestaurants,
    filteredCount,
    selectedCuisines,
    setSelectedCuisines,
    selectedRating,
    setSelectedRating,
    selectedCost,
    setSelectedCost,
    sortKey,
    setSortKey,
    visibleCount,
    setVisibleCount
  } = useTopRatedRestaurants([])

  return (
    <div className="flex gap-16 relative">

      {/* Desktop filters sidebar */}
      <div className="hidden lg:block w-1/3 border-r p-4">
        <h2 className="font-semibold text-xl">Filters</h2>
        <Filters
          selectedCuisines={selectedCuisines}
          setSelectedCuisines={setSelectedCuisines}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          selectedCost={selectedCost}
          setSelectedCost={setSelectedCost}
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex flex-row gap-8">
          {/* Mobile / tablet filters hamburger button */}
          {!filtersOpen && <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden p-2 mb-4 w-16"
          >
            ☰
          </button>}
        <SortControls 
          sortKey={sortKey} 
          setSortKey={setSortKey}
          />
        </div>
        <RestaurantTable 
          sortedRestaurants={sortedRestaurants} 
          />
        {visibleCount < filteredCount && (
          <button onClick={() => setVisibleCount(c => c + 5)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show 5 more
          </button>
        )}
      </div>

      {/* Mobile / tablet filters overlay */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />

          {/* Slide-in panel */}
          <div className="absolute left-0 top-0 h-full w-[80vw] max-w-sm bg-white p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}>✕</button>
            </div>

            <Filters
              selectedCuisines={selectedCuisines}
              setSelectedCuisines={setSelectedCuisines}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedCost={selectedCost}
              setSelectedCost={setSelectedCost}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TopRatedRestaurants