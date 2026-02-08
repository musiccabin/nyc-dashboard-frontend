import React, { useState } from "react"
import { useTopRatedRestaurants } from "../../hooks/useTopRatedRestaurants"

import { EmptyRestaurants } from "./EmptyRestaurants"
import { RestaurantTable } from "../tables/RestaurantTable"
import Filters from "../filters/Filters"
import { SortControls } from "../SortControls"
import { InfiniteScroll } from "../InfiniteScroll"

const TopRatedRestaurants: React.FC = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)

  const {
    data: visibleRestaurants,
    filteredCount,
    selectedDay,
    setSelectedDay,
    selectedCuisines,
    setSelectedCuisines,
    selectedRating,
    setSelectedRating,
    selectedCost,
    setSelectedCost,
    sortKey,
    setSortKey,
    visibleCount,
    setVisibleCount,
    resetFilters
  } = useTopRatedRestaurants([])

  return (
    <div className="flex gap-12 relative">

      {/* Desktop filters sidebar */}
      <div className="hidden lg:block w-1/3">
        <h2 className="font-semibold text-2xl mb-3">Filters</h2>
        <Filters
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedCuisines={selectedCuisines}
          setSelectedCuisines={setSelectedCuisines}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          selectedCost={selectedCost}
          setSelectedCost={setSelectedCost}
          sortKey={sortKey}
          setSortKey={setSortKey}
        />
      </div>

      {/* Desktop vertical section divider */}
      <div className="hidden lg:block w-px self-stretch bg-gray-200 m-4" />

      <div className="flex flex-col flex-1">
        <div className="flex flex-row gap-8 sticky top-0 bg-white z-10 p-2">
          {/* Mobile/tablet: open filters panel */}
          {!filtersOpen && (
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden p-2 mb-4 w-16 text-2xl hover:bg-gray-50"
            >
              ☰
            </button>
          )}
          {visibleRestaurants?.length > 0 &&
            <SortControls sortKey={sortKey} setSortKey={setSortKey} selectedDay={selectedDay} />}
        </div>

        {/* Display table of restaurants or a message when no data is available */}
        {visibleRestaurants?.length > 0 ? (
          <div>
          <RestaurantTable 
            visibleRestaurants={visibleRestaurants} 
            selectedDay={selectedDay}
          />
          <InfiniteScroll
            visibleCount={visibleCount}
            filteredCount={filteredCount}
            setVisibleCount={setVisibleCount}
          />
          </div>
            ) : (
            <EmptyRestaurants resetFilters={resetFilters} />
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
          <div className="absolute left-0 top-0 h-full max-w-sm bg-white p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-2xl">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}>✕</button>
            </div>

            <Filters
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedCuisines={selectedCuisines}
              setSelectedCuisines={setSelectedCuisines}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedCost={selectedCost}
              setSelectedCost={setSelectedCost}
              sortKey={sortKey}
              setSortKey={setSortKey}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TopRatedRestaurants