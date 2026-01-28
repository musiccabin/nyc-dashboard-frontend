import type { TopRestaurant } from "../../types/metrics"
import WeekendIcon from '../../assets/weekend-borderless.png'
import WeekdayIcon from '../../assets/weekday-borderless.png'

type Props = {
  sortedRestaurants: TopRestaurant[]
}

export function RestaurantTable({ sortedRestaurants }: Props) {

  return (
    <div className="flex-1">
      <table className="w-full text-left border-collapse">
        {/* <thead className="sm:hidden lg:table-header-group">
        <tr className="border-b last:border-b-0">
            <th className="pl-4">Restaurant</th>
            <th>
            cRating
            </th>

            <th>
            ⏱ Speed
            </th>
        </tr>
        </thead> */}

        <tbody>
          {sortedRestaurants.map(r => (
            <tr key={crypto.randomUUID()} className="hover:bg-teal-50/50">
              <td className="p-4 relative">
                <span className="hover:underline cursor-pointer">
                  {r.name}
                </span>
              </td>

              {/* Rating */}
              <td className="px-2 py-8 flex items-center">
                <div className="flex flex-row flex-wrap">
                  <span className="mr-1">★</span>
                  {r.avg_rating.toFixed(1)}
                  {/* Icon to indicate weekend/weekday rating fluctuations */}
                  {r.higher_day === "Weekend" && (
                    <img
                      src={WeekendIcon}
                      alt="Weekend"
                      className="h-4 ml-2 mt-1"
                    />
                  )}
                  {r.higher_day === "Weekday" && (
                    <img
                      src={WeekdayIcon}
                      alt="Weekday"
                      className="h-4 ml-2 mt-1"
                    />
                  )}
                </div>
              </td>

              {/* Speed */}
              <td className="px-2 py-8">
                <div className="flex items-center gap-2">
                  <span className="mr-1">⏱</span>
                  <div className="w-20 md:w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full
                        ${r.avg_prep_time < 25 && "bg-teal-500 w-1/3"}
                        ${r.avg_prep_time >= 25 && r.avg_prep_time <= 28 && "bg-teal-500 w-2/3"}
                        ${r.avg_prep_time > 28 && "bg-teal-500 w-full"}
                      `}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{r.avg_prep_time}m</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
