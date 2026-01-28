import React from "react"
import { RatingSlider, CostSlider } from "./Sliders"
import { CuisineTags } from "./CuisineTags"

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
    <div className="flex flex-col gap-4 p-5 sticky top-0 h-screen overflow-auto">
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
