export type SortKey =
  | "avg_rating"
  | "avg_weekday_rating"
  | "avg_weekend_rating"
  | "avg_prep_time"
  | "avg_weekday_prep_time"
  | "avg_weekend_prep_time"

export type Day = "Weekday" | "Weekend" | "Any Day"

export type TopRestaurant = {
  name: string
  avg_rating: number,
  avg_weekday_rating: number,
  avg_weekend_rating: number,
  avg_prep_time: number,
  avg_weekday_prep_time: number,
  avg_weekend_prep_time: number,
  avg_cost: number,
  cuisine: string,
  higher_rating_day: Day
  faster_prep_day: Day
}