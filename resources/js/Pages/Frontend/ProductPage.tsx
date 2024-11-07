import { Header } from "@/components/header"
import { ProductPage } from "@/components/product-page"
import { PageProps } from "@/types";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    content: string;
    sale_price: number;
    images : string | Blob | null;

    // Add more fields based on your Product model
}


export default function ProductShow ( {product }:PageProps<{ product:Product}>) {

    return (
        <>
        <Header />
        <ProductPage productData={product} />
        </>
    )}