import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string | number;
  name: string;
  price: number | null;
  description: string;
  content: string;
  sale_price: number | null;
  images: string[] | [];
  discount: number | null;
  product_type: string;
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
    // setWishlist(prev => 
    //   prev.includes(product.id) 
    //     ? prev.filter(id => id !== product.id)
    //     : [...prev, product.id]
    // )
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
      <div className={`grid ${getGridColumns()} gap-6 gap-y-12`}>
        {products.map((product) => (
          <div key={product.id} className="overflow-hidden">
            <div className="relative transition duration-500 rounded hover:shadow-md overflow-hidden group">
              <img src={product.images[0]} alt={product.name} className="w-full object-cover text-card-foreground rounded hover:shadow-xl shadow-sm group-hover:scale-110 transform-gpu transition duration-500 ease-in-out delay-150" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 left-2 text-primary-foreground"
                
                aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart onClick={() => toggleWishlist(product)} className={wishlist ? "fill-current" : ""} />
              </Button>
            </div>
            <div className="py-1">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground line-through text-sm mr-2">
                    ₹{product?.price?.toFixed(2)}
                  </span>
                  <span className="text-gray-900 font-bold">
                    {product.sale_price ? '₹' + product.sale_price.toFixed(2) : null} {product.sale_price ? <Badge className="bg-green-600 text-gray-50">{product.discount} % OFF</Badge> : null }
          
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