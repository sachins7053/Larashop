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
import { SlidersHorizontal } from "lucide-react"
import { Cross2Icon } from "@radix-ui/react-icons"

export interface Product {
  id: number
  name: string
  price: number
  color: string
  material: string
  image: string
}

interface ProductArchiveProps {
  initialProducts: Product[]
  fetchMoreProducts: (start: number, end: number) => Promise<Product[]>
  title?: string
}

interface FilterState {
  priceRange: [number, number]
  selectedColors: string[]
  selectedMaterials: string[]
}

const ColorSwatch = ({ color, isSelected, onChange }: { color: string; isSelected: boolean; onChange: (color: string) => void }) => (
  <button
    className={`w-6 h-6 rounded-full border-2 ${isSelected ? 'border-black' : 'border-gray-300'}`}
    style={{ backgroundColor: color }}
    onClick={() => onChange(color)}
    aria-label={`Select ${color}`}
  />
)

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
)

const ProductCard = ({ product }: { product: Product }) => (
  

  <div className="border bg-white rounded-md overflow-hidden shadow-lg">
    <img src="https://mysleepyhead.com/media/catalog/product/1/1/11_1.jpg" alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">₹{product.price}</p>
      <p className="text-sm text-gray-500">{product.color} | {product.material}</p>
    </div>
  </div>

)

const Sidebar = ({ filters, setFilters, isMobile = false }: { 
  filters: FilterState; 
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>; 
  isMobile?: boolean 
}) => {
  const colors = ['Red', 'Blue', 'Green', 'Yellow']
  const materials = ['Cotton', 'Polyester', 'Wool', 'Silk']

  const handlePriceRangeChange = (newRange: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: [newRange[0], newRange[1]] }))
  }

  const toggleColor = (color: string) => {
    setFilters(prev => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(color)
        ? prev.selectedColors.filter(c => c !== color)
        : [...prev.selectedColors, color]
    }))
  }

  const toggleMaterial = (material: string) => {
    setFilters(prev => ({
      ...prev,
      selectedMaterials: prev.selectedMaterials.includes(material)
        ? prev.selectedMaterials.filter(m => m !== material)
        : [...prev.selectedMaterials, material]
    }))
  }

  return (
    <div className={`space-y-6 ${isMobile ? 'p-6' : ''}`}>
      <FilterSection title="Price Range">
        <Label htmlFor={`${isMobile ? 'mobile-' : ''}price-range`}>
          {filters.priceRange[0]} - {filters.priceRange[1]}
        </Label>
        <Slider
          id={`${isMobile ? 'mobile-' : ''}price-range`}
          min={0}
          max={100}
          step={1}
          value={filters.priceRange}
          onValueChange={handlePriceRangeChange}
          className="mt-2"
        />
      </FilterSection>
      
      <FilterSection title="Color">
        <div className="flex space-x-2 mt-2">
          {colors.map(color => (
            <ColorSwatch
              key={color}
              color={color.toLowerCase()}
              isSelected={filters.selectedColors.includes(color)}
              onChange={toggleColor}
            />
          ))}
        </div>
      </FilterSection>
      
      <FilterSection title="Material">
        <div className="space-y-2 mt-2">
          {materials.map(material => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`${isMobile ? 'mobile-' : ''}material-${material}`}
                checked={filters.selectedMaterials.includes(material)}
                onCheckedChange={() => toggleMaterial(material)}
              />
              <Label htmlFor={`${isMobile ? 'mobile-' : ''}material-${material}`}>{material}</Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}

export function ProductArchive({ initialProducts, fetchMoreProducts, title = "Products" }: ProductArchiveProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    selectedColors: [],
    selectedMaterials: []
  })
  const [sortBy, setSortBy] = useState('default')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef(null)

  const filterProducts = useCallback(() => {
    let filtered = products.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1] &&
      (filters.selectedColors.length === 0 || filters.selectedColors.includes(product.color)) &&
      (filters.selectedMaterials.length === 0 || filters.selectedMaterials.includes(product.material))
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
  }, [products, filters, sortBy])

  useEffect(() => {
    filterProducts()
  }, [filterProducts])

  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const newProducts = await fetchMoreProducts(products.length, products.length + 20)
      setProducts(prev => [...prev, ...newProducts])
    } catch (error) {
      console.error('Error fetching more products:', error)
    } finally {
      setIsLoading(false)
    }
  }, [products.length, fetchMoreProducts])

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
    <div className="container mx-auto bg-">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar for desktop */}
        <aside className="w-full md:w-64 hidden md:block p-3">
          <div className="sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            <Sidebar filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
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
                className="md:hidden bg-white"
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
              <ProductCard key={product.id} product={product} />
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
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Filters</h2>
              <Button variant="ghost" onClick={() => setIsSidebarOpen(false)}>
                <Cross2Icon className="h-6 w-6" />
              </Button>
            </div>
            <Sidebar filters={filters} setFilters={setFilters} isMobile />
          </div>  
        </div>
      )}
    </div>
  )
}