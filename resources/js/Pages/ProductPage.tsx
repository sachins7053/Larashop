import { Header } from "@/components/header"
import { ProductDetails } from "@/components/productDetails"
import Guest from "@/Layouts/GuestLayout";

interface Product {
    id: string;
    name: string;
    price: number | null;
    description: string;
    content: string;
    sale_price: number | null;
    images: string[] | null;
    variations: variation[];
    product_type: string;
  
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

interface ProductPageProps {
    product: Product; // Define productData as part of the props
  }

export default function ProductShow ({product}: ProductPageProps) {


    product ={
        id: '1',
        name: "Product 1",
        price: 100,
        sale_price: 80,
        content: "This is a sample product.",
        description: "This is a sample product.",
        images: ["https://example.com/image1.jpg"],
        variations:[],
        product_type: 'variable'
    } 
    return (
        <>
          <Guest>
          <ProductDetails productData={product}/>

        
          </Guest>
        </>
    )}