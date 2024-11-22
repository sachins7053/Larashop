import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  title: string
  images: string
  price: number
  salePrice: number | null
  rating: number
  discount: number
  sale_price: number | null
}

interface ProductGridProps {
  products?: Product[]
  title?: string
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
}

export function ProductGrid({
  products = [],
  title = "Products",
  columns = { sm: 2, md: 3, lg: 4, xl: 5 },
  onAddToCart,
  onToggleWishlist
}: ProductGridProps) {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    )
    onToggleWishlist?.(product)
  }

  const handleAddToCart = (product: Product) => {
    onAddToCart?.(product)
  }

  const getGridColumns = () => {
    return `grid-cols-1 ${columns.sm ? `sm:grid-cols-${columns.sm}` : ''} ${columns.md ? `md:grid-cols-${columns.md}` : ''} ${columns.lg ? `lg:grid-cols-${columns.lg}` : ''} ${columns.xl ? `xl:grid-cols-${columns.xl}` : ''}`
  }
  
  setTimeout(()=>{
    if (products.length === 0) {
      console.log(products.length)
      return (
        <div className="w-full text-center py-8">
        <p className="text-lg text-muted-foreground">No products available.</p>
      </div>
    )
  }
}, 2000 )

  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className={`grid ${getGridColumns()} gap-6`}>
        {products.map((product) => (
          <div key={product.id} className="overflow-hidden">
            <div className="relative">
              <img src="https://ii1.pepperfry.com/media/catalog/product/t/a/494x544/tahara-queen-size-bed-in-virola-wood-finish-with-hydraulic-strorage-tahara-queen-size-bed-in-virola--fqd3dn.jpg" alt={product.title} className="w-full object-cover text-card-foreground rounded hover:shadow-lg shadow-sm" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 left-2 text-primary-foreground"
                
                aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart onClick={() => toggleWishlist(product)} className={wishlist.includes(product.id) ? "fill-current" : ""} />
              </Button>
            </div>
            <div className="py-1">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground line-through text-sm mr-2">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <span className="text-primary font-bold">
                    ₹{product.sale_price ? product.sale_price.toFixed(2) : null} {product.sale_price ? <Badge className="bg-green-600 text-gray-50">{product.discount} % OFF</Badge> : null }
          
                  </span>
                </div>
                <div className="flex items-center mb-2">
                <span className="text-yellow-400 mr-1">★★★★ </span>
                <span></span>
              </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}