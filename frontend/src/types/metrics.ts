export type TopRestaurant = {
  name: string
  avg_rating: number,
  avg_prep_time: number,
  avg_cost: number,
  cuisine: string
}

export type FastRestaurant = {
  restaurant: string
  fulfilment_time: number
}