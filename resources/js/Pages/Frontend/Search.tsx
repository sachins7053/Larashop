import { ProductArchive } from '@/components/components-product-archive'
import { ProductGrid } from '@/components/product-grid'
import Guest from '@/Layouts/GuestLayout'
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

const fetchMoreProducts = async (start: number, end: number): Promise<ProductGridData[]> => {

  console.log(start, end)
  const data = [{
    id: 2,
    title: 'string',
    name: 'string',
    price: 50,
    color: 'string',
    material: 'string',
    image: 'string',
    sale_price:  null
    }];
  return data
}

export default function Search({keyword ,products}:any) {

    console.log("Products",products)
    const handleToggleWishlist = (product: any) => {
        // Implement wishlist toggle logic
        console.log('Toggling wishlist:', product)
      }

  return (
    <Guest>

            
        <div className="relative w-full mx-auto max-w-2xl px-4 lg:max-w-8xl">      
                              <section className="mb-12">
                                  <ProductGrid
                                  products={products}
                                  title={`Showing Result for ${keyword}`}
                                  columns={{ sm: 2, md: 4, lg: 4 }}
                                  onToggleWishlist={handleToggleWishlist}
                                  />
                              </section>
            </div>

            <div>
            <ProductArchive
              initialProducts={products}
              fetchMoreProducts={fetchMoreProducts}  // Pass the updated fetchMoreProducts function
              title={`Showing for : ${keyword || 'Unknown Category'}`}
            />
            </div>

    </Guest>
  )
}
