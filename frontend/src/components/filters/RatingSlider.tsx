import { useState, useRef } from 'react'
import * as Slider from '@radix-ui/react-slider'

interface RatingSliderProps {
  selectedRating: number
  setSelectedRating: (value: number) => void
}

export function RatingSlider({ selectedRating, setSelectedRating }: RatingSliderProps) {
  const labels = [3.5, 4, 4.5, 5]
  const [isDragging, setIsDragging] = useState(false)

  const sliderRef = useRef<HTMLDivElement | null>(null)

  const snapToLabel = (newValue: number) => {
    if (isDragging)
      return setSelectedRating(newValue)

    let snappedValue = newValue
      const closest = labels.reduce((prev, curr) =>
      Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
    )
    if (Math.abs(newValue - closest) <= 0.2) {
      snappedValue = closest
    }
    setSelectedRating(snappedValue)
  }
  
  return (
    <div>
        <span className="block font-semibold mb-3">Rating:  ★ {selectedRating.toFixed(1)}+</span>
        <Slider.Root
            ref={sliderRef}
            className="relative flex items-center w-full h-4 select-none touch-none"
            value={[selectedRating]}
            min={3.5}
            max={5}
            step={0.1}
            onValueChange={([v]) => snapToLabel(v)}
            onPointerDown={() => setIsDragging(true)}
            onPointerUp={() => setIsDragging(false)}
            >
            <Slider.Track className="bg-teal-500 relative grow rounded-full h-2">
                <Slider.Range
                className="absolute bg-gray-300 rounded-full h-full right-0"
                />
            </Slider.Track>
            {/* Ticks and labels */}
            <div className="absolute left-0 right-0 top-1/2 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => {
                if (i === 0 || i === 15) return null
                const isMajor = i % 5 === 0

                return (
                  <span
                    key={i}
                    className={`absolute w-px ${
                      isMajor ? "h-2.5 bg-gray-400" : "h-1.5 bg-gray-400"
                    }`}
                    style={{
                      left: `${(i / 15) * 100}%`,
                      transform: "translateX(-0.5px)",
                    }}
                  />
                )
              })}
              <div className="relative mt-3">
                {labels.map((value) => {
                  const percent = ((value - labels[0]) / (labels[labels.length - 1] - labels[0])) * 100

                  return (
                    <span
                      key={value}
                      className="absolute text-sm text-gray-500"
                      style={{
                        left: `${percent}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      {value}
                    </span>
                  )
                })}
              </div>
            </div>
            <Slider.Thumb className="block w-4 h-4 bg-teal-500 rounded-full" />
        </Slider.Root>
    </div>
  )
}