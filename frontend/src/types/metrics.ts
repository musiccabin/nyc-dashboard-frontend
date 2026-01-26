export type TopRestaurant = {
  name: string
  avg_rating: number,
  avg_prep_time: number,
  avg_cost: number,
  cuisine: string,
  higher_day: string
}

export type SortKey = "avg_rating" | "avg_prep_time"