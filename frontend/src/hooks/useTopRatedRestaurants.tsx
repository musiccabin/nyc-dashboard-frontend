import { useState, useMemo, useEffect } from "react"

import type { TopRestaurant } from "../types/metrics"
import type { SortKey } from "../types/metrics"
import type { Day } from "../types/metrics"
import { cuisineOptions } from "../constants/customerView"

const defaultRating = 4
const defaultCost = 40

const getToday = (): Day => {
  const today = new Date().getDay()
  return today === 0 || today === 6 ? "Weekend" : "Weekday"
}

export function useTopRatedRestaurants(initialData: TopRestaurant[]) {
  const [topRatedData, setTopRatedData] = useState<TopRestaurant[]>(initialData)
  const [selectedDay, setSelectedDay] = useState<Day>(getToday())
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(cuisineOptions)
  const [selectedRating, setSelectedRating] = useState<number>(defaultRating)
  const [selectedCost, setSelectedCost] = useState<number>(defaultCost)
  const [sortKey, setSortKey] = useState<SortKey>(
  getToday() === "Weekday" ? "avg_weekday_rating" : "avg_weekend_rating"
)
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
    return topRatedData.filter(r => {
      let meetsRating
      switch(selectedDay) {
        case 'Weekday':
          meetsRating = r.avg_weekday_rating >= selectedRating
          break
        case 'Weekend':
          meetsRating = r.avg_weekend_rating >= selectedRating
          break
        case 'Any Day':
          meetsRating = r.avg_rating >= selectedRating
          break
        default:
          meetsRating = false
      }
      return selectedCuisines.includes(r.cuisine) &&
      meetsRating &&
      r.avg_cost <= selectedCost
    })
  }, [
      topRatedData, 
      selectedDay, 
      selectedCuisines, 
      selectedRating, 
      selectedCost
    ])

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      switch(sortKey) {
        case 'avg_weekday_rating':
          return b.avg_weekday_rating - a.avg_weekday_rating
        case 'avg_weekend_rating':
          return b.avg_weekend_rating - a.avg_weekend_rating
        case 'avg_weekday_prep_time':
          return a.avg_weekday_prep_time - b.avg_weekday_prep_time
        case 'avg_weekend_prep_time':
          return a.avg_weekend_prep_time - b.avg_weekend_prep_time
        case 'avg_prep_time':
          return a.avg_prep_time - b.avg_prep_time
        default:
          return b.avg_rating - a.avg_rating
      }
    })
  }, [filteredData, sortKey])

    // Set visible count
  const visibleRestaurants = sortedData.slice(0, visibleCount)

  // Reset filters
  const resetFilters = () => {
    setSelectedCuisines(cuisineOptions)
    setSelectedRating(defaultRating)
    setSelectedCost(defaultCost)
    setSelectedDay(getToday())
  }

  // wrapper: scroll to top upon filter change
  function withScroll<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }


  return {
    data: visibleRestaurants,
    filteredCount: filteredData.length,

    selectedDay,
    setSelectedDay: withScroll(setSelectedDay),

    selectedCuisines,
    setSelectedCuisines: withScroll(setSelectedCuisines),

    selectedRating,
    setSelectedRating: withScroll(setSelectedRating),

    selectedCost,
    setSelectedCost: withScroll(setSelectedCost),

    sortKey,
    setSortKey: withScroll(setSortKey),

    visibleCount,
    setVisibleCount,

    resetFilters
  }
}
