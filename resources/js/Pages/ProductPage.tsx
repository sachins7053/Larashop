import { Header } from "@/components/header"
import { ProductPage } from "@/components/product-page"

interface Product {
    id: string;
    name: string;
    price: number;
    sale_price: number;
    content: string;
    description: string;
    images: string | Blob | null;
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
        images: "https://example.com/image1.jpg"
    } 
    return (
        <>
        <Header />
        <ProductPage productData={product}/>
        </>
    )}