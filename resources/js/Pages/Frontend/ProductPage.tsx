import Guest from "@/Layouts/GuestLayout";
import { useState, useEffect } from "react";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { PageProps } from "@/types";
import { ProductGrid } from "@/components/product-grid";
import { ProductType} from "@/types";
import { ReviewForm } from "@/components/Reviews/ReviewForm";



export default function ProductShow ( {product, relatedProducts, auth }:PageProps<{ product:ProductType; relatedProducts:ProductType[] }>) {

  const productData = typeof product === "string" ? JSON.parse(product) : product;
  console.log(productData)
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

                    <div className="relative w-full mx-auto max-w-2xl px-4 lg:max-w-8xl">

                        <div className="md:flex">

                            <div className="basis-1/3 w-full">
                                {auth?.user? <ReviewForm productId={product.id} />: 'Please Login First To Submit Review' }
                                
                            </div>
                            <div className="basis-2/3 w-full p-4">
                                
                                No review Found.

                            </div>


                        </div>

                    </div>
                </div>
            </Guest>
        </>
    )}