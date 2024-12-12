import Guest from "@/Layouts/GuestLayout";
import { useState, useEffect } from "react";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { PageProps } from "@/types";
import { ProductGrid } from "@/components/product-grid";
import { ProductType} from "@/types";



export default function ProductShow ( {product, relatedProducts }:PageProps<{ product:ProductType; relatedProducts:ProductType[] }>) {

  const productData = typeof product === "string" ? JSON.parse(product) : product;

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string | null>>({});

  const handleVariationSelect = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: prev[attributeName] === value ? null : value,
    }));
  };

      // console.log(product)
      const handleToggleWishlist = (product: any) => {
        
        console.log('Toggling wishlist:', product)
      }

    return (
        <>
          <Guest>
              <div className="bg-white">
                <ProductDetails product={productData} />
                  <div className="relative w-full mx-auto max-w-2xl px-4 lg:max-w-8xl">      
                              <section className="mb-12">
                                  <ProductGrid
                                  products={relatedProducts}
                                  title="Related Products"
                                  columns={{ sm: 2, md: 4, lg: 4 }}
                                  onToggleWishlist={handleToggleWishlist}
                                  />
                              </section>
                    </div>
                </div>
            </Guest>
        </>
    )}