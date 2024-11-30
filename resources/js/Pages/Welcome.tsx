'use client'
import { useState, useEffect } from 'react'
import { ProductGrid } from '@/components/product-grid';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/components/header';
import { ImageSlider } from '@/components/image-slider';
import Footer from '@/components/Footer';
import Guest from '@/Layouts/GuestLayout';

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

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
    console.log('API Key:', process.env.REACT_APP_SMS_ALERT_API);
    useEffect(() => {
        // Simulating API calls for different product queries
        const fetchProducts = async () => {
          try {
            // In a real application, these would be separate API calls
            const featuredResponse = await fetch('https://dummyjson.com/products?limit=12')
    
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

      const handleAddToCart = (product: Product) => {
        // Implement add to cart logic
        console.log('Adding to cart:', product)
      }
    
      const handleToggleWishlist = (product: Product) => {
        // Implement wishlist toggle logic
        console.log('Toggling wishlist:', product)
      }
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const arrayOfSlides = [
        {
          id: 1,
          image: 'https://www.woodenstreet.com/images/home-new1/diwali-special-banner.jpg?v=3431',
          title: 'Beautiful Landscape',
          description: 'A stunning view of mountains and lakes',
        },
        {
          id: 2,
          image: 'https://www.woodenstreet.com/images/home-new1/banner-3.jpg?v=343',
          title: 'City Skyline',
          description: 'Modern architecture in a bustling metropolis',
        },
        {
          id: 3,
          image: 'https://www.woodenstreet.com/images/home-new1/banner-4.jpg?v=343',
          title: 'Tropical Beach',
          description: 'Pristine white sand and crystal clear waters',
        },
        {
          id: 4,
          image: 'https://www.woodenstreet.com/images/home-new1/banner-6.jpg?v=3431',
          title: 'Forest Trail',
          description: 'A serene path through lush green woods',
        },
        {
          id: 5,
          image: 'https://www.woodenstreet.com/images/home-new1/banner-3.jpg?v=343',
          title: 'Desert Sunset',
          description: 'Breathtaking colors over sand dunes',
        }
      ];

    return (
        <Guest>
     
            <Head title="Welcome " />
           
               
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-4 lg:max-w-8xl">
                        <ImageSlider slides={arrayOfSlides} />
                        
                        <section className="mb-12">
                            <ProductGrid
                            products={featuredProducts}
                            title="Featured Products"
                            columns={{ sm: 2, md: 4, lg: 4 }}
                            onAddToCart={handleAddToCart}
                            onToggleWishlist={handleToggleWishlist}
                            />
                        </section>
                    </div>
                </div>
          
        </Guest>
    );
}
