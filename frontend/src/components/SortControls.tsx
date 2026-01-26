import type { SortKey } from "../types/metrics"

type Props = {
  sortKey: string
  setSortKey: (val: SortKey) => void
}

export function SortControls({
  sortKey, setSortKey
}: Props) {
  return (
      <div className="flex justify-between items-center mb-2 gap-4">
        <span className="font-semibold">Sort by:</span>

        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded border ${
              sortKey === "avg_rating" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setSortKey("avg_rating")}
          >
            ⭐ Rating
          </button>

          <button
            className={`px-3 py-1 rounded border ${
              sortKey === "avg_prep_time" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setSortKey("avg_prep_time")}
          >
            ⏱ Speed
          </button>
        </div>
      </div>
  )
}
