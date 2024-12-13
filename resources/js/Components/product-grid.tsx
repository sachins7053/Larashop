import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductType } from '@/types'
import { Link } from '@inertiajs/react'

interface ProductGridProps {
  products?: ProductType[]
  title?: string
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  onAddToCart?: (product: any) => void
  onToggleWishlist?: (product: any) => void
}

export function ProductGrid({
  products = [],
  title = "",
  columns = { sm: 2, md: 3, lg: 4, xl: 5 },
  onAddToCart,
  onToggleWishlist
}: ProductGridProps) {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (product: ProductType) => {
    onToggleWishlist?.(product)
  }

  const handleAddToCart = (product: ProductType) => {
    onAddToCart?.(product)
  }

  const getGridColumns = () => {
    return `grid-cols-1 ${columns.sm ? `sm:grid-cols-${columns.sm}` : ''} ${columns.md ? `md:grid-cols-${columns.md}` : ''} ${columns.lg ? `lg:grid-cols-${columns.lg}` : ''} ${columns.xl ? `xl:grid-cols-${columns.xl}` : ''}`
  }
  
  setTimeout(() => {
    if (products.length === 0) {
      return (
        <div className="w-full text-center py-8">
          <p className="text-lg text-muted-foreground">No products available.</p>
        </div>
      )
    }
  }, 2000)

  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className={`grid ${getGridColumns()} gap-6 gap-y-12`}>
        {products.map((product) => (
          <Link href={route('product.slug', {slug: product.slug})} key={product.id}>
          <div className="overflow-hidden">
            <div className="relative transition duration-500 rounded hover:shadow-md overflow-hidden group">
              <img
                src={product?.images == null ? "" : product.images[0]}
                alt={product.name}
                className="w-full object-cover text-card-foreground rounded hover:shadow-xl shadow-sm group-hover:scale-110 transform-gpu transition duration-500 ease-in-out delay-150 min-h-52"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 left-2 text-primary-foreground"
                aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  onClick={() => toggleWishlist(product)}
                  className={wishlist.includes(product.id) ? "fill-current" : ""}
                />
              </Button>
            </div>
            <div className="py-1">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}{product.attribute_value && `- ${product.attribute_value}`}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground line-through text-sm mr-2">
                    ₹{product?.price?.toFixed(2)}
                  </span>
                  <span className="text-gray-900 font-bold">
                    {product.sale_price ? '₹' + product.sale_price.toFixed(2) : null}
                    {product.sale_price ? (
                      <Badge className="bg-green-600 text-gray-50">{product.discount} % OFF</Badge>
                    ) : null}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400 mr-1">★★★★ </span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
