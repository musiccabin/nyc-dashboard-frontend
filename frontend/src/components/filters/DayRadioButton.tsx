import type { Day, SortKey } from "../../types/metrics"

const dayOptions: Day[] = ["Weekday", "Weekend", "Any Day"]

interface DayRadioButtonProps {
  selectedDay: Day
  setSelectedDay: (val: Day) => void
  sortKey: SortKey
  setSortKey: (val: SortKey) => void
}

export function DayRadioButton({ 
  selectedDay, setSelectedDay, 
  sortKey, setSortKey 
}: DayRadioButtonProps) {
  const reSort = (option: Day) => {
    setSelectedDay(option)
    const sortBy = sortKey.includes("rating") ? "rating" : "prep_time"
    switch(option) {
      case "Weekday": setSortKey(`avg_weekday_${sortBy}` as SortKey)
      break
      case "Weekend": setSortKey(`avg_weekend_${sortBy}` as SortKey)
      break
      default: setSortKey(`avg_${sortBy}` as SortKey)
      break
  }
}

  return (
    <div className="space-y-2 mb-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {dayOptions.map(option => {
          const isSelected = selectedDay === option

          return (
            <label
              key={option}
              className={`
                flex items-center px-3 py-1 rounded-lg border cursor-pointer
                transition
                ${isSelected
                  ? "border-teal-500 bg-teal-500 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}
              `}
            >
              <input
                type="radio"
                name="day-preference"
                value={option}
                checked={isSelected}
                onChange={() => reSort(option)}
                className="sr-only"
              />
              <span className="text-sm whitespace-nowrap">{option}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

