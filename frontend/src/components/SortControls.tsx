import type { SortKey, Day } from "../types/metrics"

type Props = {
  sortKey: string
  setSortKey: (val: SortKey) => void
  selectedDay: Day
}

export function SortControls({
  sortKey, setSortKey, selectedDay
}: Props) {
  const sortByRating = ["avg_weekday_rating", "avg_weekend_rating", "avg_rating"].includes(sortKey)
  
  const ratingSortKey: SortKey =
    selectedDay === "Weekday" ? "avg_weekday_rating" :
    selectedDay === "Weekend" ? "avg_weekend_rating" :
    "avg_rating"

  const speedSortKey: SortKey =
    selectedDay === "Weekday" ? "avg_weekday_prep_time" :
    selectedDay === "Weekend" ? "avg_weekend_prep_time" :
    "avg_prep_time"

  return (
      <div className="flex justify-between items-center mb-2 gap-4">
        <span className="font-semibold">Sort by:</span>

        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded border ${
              sortByRating ? "bg-teal-500 text-white hover:bg-teal-600 transition" : "bg-white text-gray-700 hover:bg-gray-50 transition"
            }`}
            onClick={() => setSortKey(ratingSortKey)}
          >
            ⭐ Rating
          </button>

          <button
            className={`px-3 py-1 rounded border ${
              !sortByRating ? "bg-teal-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50 transition"
            }`}
            onClick={() => setSortKey(speedSortKey)}
          >
            ⏱ Speed
          </button>
        </div>
      </div>
  )
}
