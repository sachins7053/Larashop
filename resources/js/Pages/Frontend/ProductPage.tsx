import Guest from "@/Layouts/GuestLayout";
import { ProductDetails } from "@/components/productDetails"
import { PageProps } from "@/types";
import { ProductGrid } from "@/components/product-grid";
import { ReviewForm } from "@/components/Reviews/ReviewForm";


interface Product {
  id: string;
  name: string;
  price: number | null;
  description: string;
  content: string;
  sale_price: number | null;
  images: string[] | [];
  variations: variation[];
  product_type: string;
  discount: number | null;
  }

  interface variation {
    attribute_id: number;
    attribute_name: string;
    variation_id: string;
    product_id: number;
    price: string;
    sale_price: string;
    attribute_value: string;
  }

export default function ProductShow ( {product, relatedProducts, variations, auth }:PageProps<{ product:Product; relatedProducts:Product[]; variations:any, auth:any }>) {
  
      console.log(product)
      console.log('variations', variations)
      const handleToggleWishlist = (product: any) => {
        
        console.log('Toggling wishlist:', product)
      }

    return (
        <>
          <Guest>
              <div className="bg-white">
                <ProductDetails productData={product} />
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
                                {auth?.user? <ReviewForm productId={product.id} />: '' }
                                
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