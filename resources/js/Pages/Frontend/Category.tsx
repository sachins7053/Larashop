'use client'

import { useEffect, useState } from 'react'
import { ProductArchive } from '@/components/components-product-archive'
import { Product } from '@/components/components-product-archive'

// This function would typically be in a separate API file
async function fetchCategoryProducts(category: string, start: number, end: number): Promise<Product[]> {
  // In a real application, you'd make an API call here
  const response = await fetch(`/api/products?category=${category}&start=${start}&end=${end}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [initialProducts, setInitialProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchCategoryProducts(params.slug, 0, 20).then(setInitialProducts)
  }, [params.slug])

  const fetchMoreProducts = (start: number, end: number) => 
    fetchCategoryProducts(params.slug, start, end)

  return (
    <ProductArchive
      initialProducts={initialProducts}
      fetchMoreProducts={fetchMoreProducts}
      title={`Category: ${params.slug}`}
    />
  )
}