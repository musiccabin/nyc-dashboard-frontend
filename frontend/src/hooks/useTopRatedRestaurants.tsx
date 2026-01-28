import { useState, useMemo, useEffect } from "react"

import type { TopRestaurant } from "../types/metrics"
import type { SortKey } from "../types/metrics"
import { cuisineOptions } from "../constants/customerView"

export function useTopRatedRestaurants(initialData: TopRestaurant[]) {
  const [topRatedData, setTopRatedData] = useState<TopRestaurant[]>(initialData)
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(cuisineOptions)
  const [selectedRating, setSelectedRating] = useState<number>(4.5)
  const [selectedCost, setSelectedCost] = useState<number>(40)
  const [sortKey, setSortKey] = useState<SortKey>("avg_rating")
  const [visibleCount, setVisibleCount] = useState<number>(10)

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      const topRes = await fetch(`http://127.0.0.1:8000/metrics/top-rated-restaurants`)
      const topJson = await topRes.json()
      setTopRatedData(topJson)
    }
    fetchData()
  }, [])

  // Filter data
  const filteredData = useMemo(() => {
    return topRatedData.filter(r =>
      selectedCuisines.includes(r.cuisine) &&
      r.avg_rating >= selectedRating &&
      r.avg_cost <= selectedCost
    )
  }, [topRatedData, selectedCuisines, selectedRating, selectedCost])

  // Set visible count
  const visibleRestaurants = filteredData.slice(0, visibleCount)

  // Sort data
  const sortedData = useMemo(() => {
    return [...visibleRestaurants].sort((a, b) =>
      sortKey === "avg_rating"
        ? b.avg_rating - a.avg_rating
        : a.avg_prep_time - b.avg_prep_time
    )
  }, [visibleRestaurants, sortKey])

  return {
    data: sortedData,
    filteredCount: filteredData.length,
    setTopRatedData,
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
  }
}
