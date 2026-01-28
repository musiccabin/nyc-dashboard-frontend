import * as Slider from '@radix-ui/react-slider'

interface RatingSliderProps {
  selectedRating: number
  setSelectedRating: (value: number) => void
}

interface CostSliderProps {
  selectedCost: number
  setSelectedCost: (value: number) => void
}

export function RatingSlider({ selectedRating, setSelectedRating }: RatingSliderProps) {
  return (
    <div>
        <span className="font-semibold">Rating:  ★ {selectedRating.toFixed(1)}+</span>
        <Slider.Root
            className="relative flex items-center w-full h-4 select-none touch-none"
            value={[selectedRating]}
            min={4}
            max={5}
            step={0.1}
            onValueChange={([v]) => setSelectedRating(v)}
            >
            <Slider.Track className="bg-teal-500 relative grow rounded-full h-2">
                <Slider.Range
                className="absolute bg-gray-300 rounded-full h-full right-0"
                />
            </Slider.Track>
            <div className="absolute left-0 right-0 top-1/2 pointer-events-none">
              {Array.from({ length: 11 }).map((_, i) => {
                const isMajor = i % 2 === 0

                return (
                  <span
                    key={i}
                    className={`absolute w-px ${
                      isMajor ? "h-2.5 bg-gray-400" : "h-1.5 bg-gray-400"
                    }`}
                    style={{
                      left: `${(i / 10) * 100}%`,
                      transform: "translateX(-0.5px)",
                    }}
                  />
                )
              })}
            </div>
            <Slider.Thumb className="block w-3 h-3 bg-teal-500 rounded-full" />
        </Slider.Root>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>4</span>
            <span>4.5</span>
            <span>5</span>
        </div>
    </div>
  )
}

export function CostSlider({ selectedCost, setSelectedCost }: CostSliderProps) {
  return (
    <div className='p-4'>
        <span className="font-semibold">Up to ${selectedCost}</span>
        <Slider.Root
            className="relative flex items-center w-full h-4 select-none touch-none"
            value={[selectedCost]}
            min={20}
            max={40}
            step={5}
            onValueChange={([v]) => setSelectedCost(v)}
            >
            <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-teal-500 rounded-full h-full" />
            </Slider.Track>
            <div className="absolute left-0 right-0 top-1/2 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => {
                return (
                  <span
                    key={`cost-${i}`}
                    className="absolute w-px h-2 bg-gray-400"
                    style={{
                      left: `${(i / 4) * 100}%`,
                      transform: "translateX(-0.5px)",
                    }}
                  />
                )
              })}
            </div>
            <Slider.Thumb className="block w-4 h-4 bg-teal-500 rounded-full" />
        </Slider.Root>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>20</span>
            {/* <span>25</span> */}
            <span>30</span>
            {/* <span>35</span> */}
            <span>40</span>
        </div>
    </div>
  )
}