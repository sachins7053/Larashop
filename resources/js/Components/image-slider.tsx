import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SliderProps {
  slides: {
    id: number
    image: string
    title?: string
    description?: string
  }[]
  autoPlay?: boolean
  interval?: number
}

export function ImageSlider({ 
  slides, 
  autoPlay = true, 
  interval = 3000 
}: SliderProps = {
  slides: [
    {
      id: 1,
      image: "/placeholder.svg?height=600&width=800",
      title: "Big Diwali Sale",
      description: "Up to 55% off with free shipping"
    },
    {
      id: 2,
      image: "/placeholder.svg?height=600&width=800",
      title: "Modern Furniture",
      description: "Exclusive collection"
    }
  ]
}) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const slideRef = React.useRef<HTMLDivElement>(null)

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  React.useEffect(() => {
    if (autoPlay) {
      const slideInterval = setInterval(nextSlide, interval)
      return () => clearInterval(slideInterval)
    }
  }, [autoPlay, interval, nextSlide])

  return (
    <Card className="relative w-full overflow-hidden rounded-lg shadow-lg">
      <div
        ref={slideRef}
        className="relative h-[400px] md:h-[600px] w-full"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out
              ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title || `Slide ${index + 1}`}
                className="object-fill w-full h-full"
              />
              {(slide.title || slide.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:p-6 text-white">
                  {slide.title && (
                    <h2 className="text-xl md:text-2xl font-bold mb-2">{slide.title}</h2>
                  )}
                  {slide.description && (
                    <p className="text-sm md:text-base">{slide.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all
              ${index === currentSlide ? "bg-primary w-4" : "bg-primary/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  )
}