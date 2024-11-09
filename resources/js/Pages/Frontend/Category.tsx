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
    return [] // Return an empty array on error to avoid further issues
  }
  console.log('category response:', response)
  return response.json()

}

export default function CategoryPage({ data }: { data: any }) {
  const [initialProducts, setInitialProducts] = useState<ProductGridData[]>([]);
  const [productsData, setProductsData] = useState<ProductGridData[]>([]);

  useEffect(() => {
    if (data){
      if (data.products && Array.isArray(data.products)) {
        setProductsData(data.products);
      } else if (data.category && data.category?.slug) {
        fetchCategoryProducts(data.category.slug, 0, 10).then(setInitialProducts);
      }
    }
  }, [data]);

  const fetchMoreProducts = (start: number, end: number) => 
    data?.category?.slug ? fetchCategoryProducts(data.category.slug, start, end) : Promise.resolve([]);

  return (
    <ProductArchive
      initialProducts={initialProducts}
      fetchMoreProducts={fetchMoreProducts}
      title={`Category: ${ data?.category?.name || 'Unknown Category'}`}
    />
  )
}