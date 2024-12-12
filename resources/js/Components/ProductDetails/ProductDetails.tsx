import React, { useState } from 'react';
import ProductImages from './Images';
import ProductData from './ProductData';
import Variations from './variations';
import AddToCart from './AddToCart';
import { Separator } from '../ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { ProductType, ProductVariation } from '@/types';
import { Button } from '../ui/button';

interface ProductPageProps {
  product: ProductType;
}

const ProductDetails = ({ product }: ProductPageProps) => {
  const [price, setPrice] = useState<number>(product.price);
  const [salePrice, setSalePrice] = useState<number | null>(product.sale_price);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string | null>>({});
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

  console.log("selectedVariation", selectedVariation)

  const handleAttributeSelect = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  const handleVariationSelect = (selectedVariation: ProductVariation | null) => {
    setSelectedVariation(selectedVariation);
  };

  const sections = {
    overview: {
      title: 'Overview',
      content: product.content,
    },
    deliveryInstallation: {
      title: 'Delivery & Installation',
      content: 'Free delivery within 10-15 business days...',
    },
    termsConditions: {
      title: 'Terms And Conditions',
      content: 'Standard terms and conditions apply...',
    },
    disclaimer: {
      title: 'Disclaimer',
      content: 'Product colors may vary slightly from images shown...',
    },
  };

  const isOutOfStock = selectedVariation && selectedVariation.stock == 0 || product.product_type !== 'variable' && product.stock_status !== 'in_stock';


  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="grid gap-6 lg:grid-cols-5">
        <ProductImages images={product.images} />

        <div className="flex flex-col col-span-2 gap-4">
          <ProductData
            name={product.name}
            price={price}
            description={product.description}
            sale_price={salePrice}
            product_type={product.product_type}
          />

          {product.variations?.length > 0 && (
            <Variations
              variations={product.variations}
              setPrice={setPrice}
              setSalePrice={setSalePrice}
              selectedAttributes={selectedAttributes}
              selectedVariation={selectedVariation}
              onSelectVariation={handleVariationSelect}
              onSelectAttribute={handleAttributeSelect}
            />
          )}

          { selectedVariation !== null ?
            isOutOfStock ? (
              <div className="text-red-500 font-bold">Out of Stock</div>
            ) : (
              <AddToCart
                product={product}
                variationId={selectedVariation.variation_id}
                price={price}
                salePrice={salePrice}
                selectedAttributes={selectedAttributes}
                hasVariations={product.variations?.length > 0}
              />
            ) : <div className="flex gap-4">
            <Button disabled className="flex-1">
              Add to Cart
            </Button>
            <Button disabled variant="dark" className="flex-1">
              Buy Now
            </Button>
          </div>
          }

          <Separator className="my-4" />

          <Accordion type="single" collapsible defaultValue='overview'>
            {Object.entries(sections).map(([key, section]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger>{section.title}</AccordionTrigger>
                <AccordionContent>{section.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
