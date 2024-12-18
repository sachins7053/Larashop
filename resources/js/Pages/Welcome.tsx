'use client'
import { useState, useEffect } from 'react'
import { Head, Link } from '@inertiajs/react';
import { ImageSlider } from '@/components/image-slider';
import Guest from '@/Layouts/GuestLayout';
import ShortcodeParser from '@/components/ShortcodeParser';

interface HomepageProps {
  content: string;
}

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

export default function Welcome({ content} : HomepageProps) {
   



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

                        <ShortcodeParser content={content} />
                        
                    </div>
                </div>
          
        </Guest>
    );
}
