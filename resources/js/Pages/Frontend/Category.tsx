'use client'

import { useEffect, useState } from 'react'
import { ProductArchive } from '@/components/components-product-archive'

interface ProductGridData {
  id: number
  title: string
  name: string
  price: number
  color: string
  material: string
  image: string
  sale_price: number | null
}

async function fetchCategoryProducts(category: string, start: number, end: number): Promise<ProductGridData[]> {
  const response = await fetch(`/api/product-category?category=${category}&start=${start}&end=${end}`)
  
  if (!response.ok) {
    console.error('Failed to fetch products', response)
    return [] 
  }

  const data = await response.json()
  return data 
}

export default function CategoryPage(data: any) {
  const { category } = data;
  
  const [initialProducts, setInitialProducts] = useState<ProductGridData[]>([]);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false); 
  const [startIndex, setStartIndex] = useState(0); 
  
  useEffect(() => {
    if (category && category.slug) {
      fetchCategoryProducts(category.slug, 0, 2).then(newProducts => {
        setInitialProducts(newProducts);
        setStartIndex(2); 
        if (newProducts.length < 1) {
          setAllProductsLoaded(true);
        }
      });
    }
  }, [category]);

  const fetchMoreProducts = async (start: number, end: number): Promise<ProductGridData[]> => {
    if (!category.slug || allProductsLoaded) return []; 
    
    const newProducts = await fetchCategoryProducts(category.slug, start, end);

    if (newProducts.length === 0) {
      setAllProductsLoaded(true);
    } else {
      setInitialProducts(prevProducts => [...prevProducts, ...newProducts]);
      setStartIndex(prevIndex => prevIndex + 2);
    }

    return newProducts; 
  };

  return (
    <div>
      <ProductArchive
        initialProducts={initialProducts}
        fetchMoreProducts={fetchMoreProducts}  // Pass the updated fetchMoreProducts function
        title={`Category: ${category.name || 'Unknown Category'}`}
      />
      
      {/* Optionally, you can show a "Load More" button or auto-fetch */}
      {!allProductsLoaded && (
        <button onClick={() => fetchMoreProducts(startIndex, startIndex + 2)}>Load More</button>
      )}
    </div>
  )
}
