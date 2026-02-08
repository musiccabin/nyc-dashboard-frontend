import React from "react"
import type { Day, SortKey } from "../../types/metrics"
import { DayRadioButton } from "./DayRadioButton"
import { RatingSlider } from "./RatingSlider"
import { CostSlider } from "./CostSlider"
import { CuisineTags } from "./CuisineTags"

interface FilterProps {
  selectedDay: Day
  setSelectedDay: (val: Day) => void
  selectedCuisines: string[]
  setSelectedCuisines: (val: string[]) => void
  selectedRating: number
  setSelectedRating: (val: number) => void
  selectedCost: number
  setSelectedCost: (val: number) => void
  sortKey: SortKey
  setSortKey: (val: SortKey) => void
}

const Filters: React.FC<FilterProps> = ({
  selectedDay, setSelectedDay,
  selectedCuisines, setSelectedCuisines,
  selectedRating, setSelectedRating,
  selectedCost, setSelectedCost,
  sortKey, setSortKey
}: FilterProps) => {

  return (
    <div className="flex flex-col absolute gap-4 p-5 sticky top-0 h-screen overflow-auto">
      <DayRadioButton 
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        sortKey={sortKey}
        setSortKey={setSortKey}
      />
      <RatingSlider
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      <CostSlider
        selectedCost={selectedCost}
        setSelectedCost={setSelectedCost}
      />
      <CuisineTags 
        selectedCuisines={selectedCuisines}
        setSelectedCuisines={setSelectedCuisines}
      />
    </div>
  )
}

export default Filters
