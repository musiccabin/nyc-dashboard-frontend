import * as Slider from '@radix-ui/react-slider'

interface CostSliderProps {
  selectedCost: number
  setSelectedCost: (value: number) => void
}

export function CostSlider({ selectedCost, setSelectedCost }: CostSliderProps) {
  return (
    <div className='p-4'>
        <span className="block font-semibold mb-3">Up to ${selectedCost}</span>
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
            {/* Ticks */}
            <div className="absolute left-0 right-0 top-1/2 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => {
                if (i === 0 || i === 4) return null

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
            <span>30</span>
            <span>40</span>
        </div>
    </div>
  )
}