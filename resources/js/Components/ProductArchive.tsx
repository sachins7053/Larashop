'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, SlidersHorizontal } from "lucide-react"

// Mock product data
const generateProducts = (start: number, end: number) => 
  Array.from({ length: end - start }, (_, i) => ({
    id: start + i,
    name: `Product ${start + i}`,
    price: Math.floor(Math.random() * 100) + 1,
    color: ['Red', 'Blue', 'Green', 'Yellow'][Math.floor(Math.random() * 4)],
    material: ['Cotton', 'Polyester', 'Wool', 'Silk'][Math.floor(Math.random() * 4)],
    image: `/placeholder.svg?height=200&width=200&text=Product+${start + i}`
  }))

export default function ProductArchive() {
  const [products, setProducts] = useState(generateProducts(0, 20))
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('default')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef(null)

  const colors = ['Red', 'Blue', 'Green', 'Yellow']
  const materials = ['Cotton', 'Polyester', 'Wool', 'Silk']

  const filterProducts = useCallback(() => {
    let filtered = products.filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1] &&
      (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
      (selectedMaterials.length === 0 || selectedMaterials.includes(product.material))
    )

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [products, priceRange, selectedColors, selectedMaterials, sortBy])

  useEffect(() => {
    filterProducts()
  }, [filterProducts])

  const loadMoreProducts = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      const newProducts = generateProducts(products.length, products.length + 20)
      setProducts(prev => [...prev, ...newProducts])
      setIsLoading(false)
    }, 1000)
  }, [products])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreProducts()
        }
      },
      { threshold: 1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loadMoreProducts, isLoading])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar for desktop */}
        <aside className="w-full md:w-64 hidden md:block">
          <div className="sticky top-4 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            <div>
              <Label htmlFor="price-range">Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
              <Slider
                id="price-range"
                min={0}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Color</Label>
              <div className="space-y-2 mt-2">
                {colors.map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={(checked) => {
                        setSelectedColors(prev => 
                          checked 
                            ? [...prev, color]
                            : prev.filter(c => c !== color)
                        )
                      }}
                    />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Material</Label>
              <div className="space-y-2 mt-2">
                {materials.map(material => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox
                      id={`material-${material}`}
                      checked={selectedMaterials.includes(material)}
                      onCheckedChange={(checked) => {
                        setSelectedMaterials(prev => 
                          checked 
                            ? [...prev, material]
                            : prev.filter(m => m !== material)
                        )
                      }}
                    />
                    <Label htmlFor={`material-${material}`}>{material}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                  <p className="text-sm text-gray-500">{product.color} | {product.material}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Loading indicator */}
          <div ref={observerTarget} className="flex justify-center items-center h-20 mt-8">
            {isLoading && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>}
          </div>
        </main>
      </div>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              <Button variant="ghost" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="space-y-6">
              <div>
                <Label htmlFor="mobile-price-range">Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
                <Slider
                  id="mobile-price-range"
                  min={0}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Color</Label>
                <div className="space-y-2 mt-2">
                  {colors.map(color => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={(checked) => {
                          setSelectedColors(prev => 
                            checked 
                              ? [...prev, color]
                              : prev.filter(c => c !== color)
                          )
                        }}
                      />
                      <Label htmlFor={`mobile-color-${color}`}>{color}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Material</Label>
                <div className="space-y-2 mt-2">
                  {materials.map(material => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-material-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onCheckedChange={(checked) => {
                          setSelectedMaterials(prev => 
                            checked 
                              ? [...prev, material]
                              : prev.filter(m => m !== material)
                          )
                        }}
                      />
                      <Label htmlFor={`mobile-material-${material}`}>{material}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}