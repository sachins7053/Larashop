import { useState, useEffect } from "react";
import { Header } from "@/components/header"
import { ProductDetails } from "@/components/productDetails"
import { PageProps } from "@/types";
import { ProductGrid } from "@/components/product-grid";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    content: string;
    sale_price: number;
    images : string[] ;

    // Add more fields based on your Product model
}

interface ProductGridData {
    id: number
    title: string
    images: string
    price: number
    salePrice: number | null
    sale_price: number | null
    rating: number
    discount: number

    // Add more fields based on your Product model
}


export default function ProductShow ( {product }:PageProps<{ product:Product}>) {

    const [featuredProducts, setFeaturedProducts] = useState<ProductGridData[]>([])
    useEffect(() => {
        // Simulating API calls for different product queries
        const fetchProducts = async () => {
          try {
            // In a real application, these would be separate API calls
            const featuredResponse = await fetch('https://dummyjson.com/products?limit=10')
    
            const featured = await featuredResponse.json()
          
    
            setFeaturedProducts(featured.products)
            console.log('Featured products:', featuredProducts)
          } catch (error) {
            console.error('Error fetching products:', error)
          }
          console.log(featuredProducts)
        }
    
        fetchProducts()
        console.log(featuredProducts)
      }, [])


    
      const handleToggleWishlist = (product: ProductGridData) => {
        // Implement wishlist toggle logic
        console.log('Toggling wishlist:', product)
      }

    return (
        <>
        <Header />
        <ProductDetails productData={product} />

        <div className="relative w-full mx-auto max-w-2xl px-4 lg:max-w-8xl">
                        
                        <section className="mb-12">
                            <ProductGrid
                            products={featuredProducts}
                            title="Featured Products"
                            columns={{ sm: 2, md: 5, lg: 4 }}
                            onToggleWishlist={handleToggleWishlist}
                            />
                        </section>
                    </div>
        </>
    )}