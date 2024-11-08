
import React, { useEffect, useState } from 'react'
import { ProductGrid } from '@/components/product-grid';


interface ProductGridData {
    id: number
    title: string
    images: string
    price: number
    salePrice: number | null
    rating: number
    discount: number
    sale_price: number | null

    // Add more fields based on your Product model
}

const CategoryProduct = (data:any )=> {
    const [productsData, setProductsData] = useState<ProductGridData[]>([]);
    
    useEffect (() => {
        setProductsData(data.category.products);
    },[])

    console.log(productsData)
    const handleToggleWishlist = (product: any) => {
        console.log('Toggling wishlist:', product)
    }
  return (
    <>
    
    <div>CategoryProduct</div>
    <div className="relative w-full mx-auto max-w-2xl px-4 lg:max-w-8xl">
                        
                        <section className="mb-12">
                            <ProductGrid
                            products={productsData}
                            title="Featured Products"
                            columns={{ sm: 2, md: 5, lg: 4 }}
                            onToggleWishlist={handleToggleWishlist}
                            />
                        </section>
                    </div>
  
    </>
  )
}

export default CategoryProduct