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
            <tr key={crypto.randomUUID()} className="hover:bg-blue-50">
              <td className="pl-4 relative">
                <span className="hover:underline cursor-pointer">
                  {r.name}
                </span>
              </td>

              <td className="px-2 py-8 flex items-center gap-2">
                <span className="mr-1">⭐</span>
                {r.avg_rating.toFixed(1)}
                {r.higher_day === "Weekend" && (
                  <img
                    src={WeekendIcon}
                    alt="Weekend"
                    className="w-16 text-green-500"
                  />
                )}
                {r.higher_day === "Weekday" && (
                  <img
                    src={WeekdayIcon}
                    alt="Weekday"
                    className="w-16 text-green-500"
                  />
                )}
              </td>

              <td className="px-2 py-8">
                <div className="flex items-center gap-2">
                  <span className="mr-1">⏱</span>
                  <div className="w-20 md:w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full
                        ${r.avg_prep_time < 25 && "bg-green-500 w-1/3"}
                        ${r.avg_prep_time >= 25 && r.avg_prep_time <= 28 && "bg-yellow-400 w-2/3"}
                        ${r.avg_prep_time > 28 && "bg-red-500 w-full"}
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
