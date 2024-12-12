import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { CartData, CartManager } from '@/hooks/CartManager';
import { usePage } from '@inertiajs/react';

interface AddToCartProps {
  product: any;
  variationId: number | null;
  price: number;
  salePrice: number | null;
  selectedAttributes: Record<string, string | null>;
  hasVariations: boolean;
}

const AddToCart: React.FC<AddToCartProps> = ({ product, variationId, price, salePrice, selectedAttributes, hasVariations }) => {
  const user = usePage().props.auth.user;
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    let item: CartData;

    if (hasVariations) {
      if (Object.values(selectedAttributes).some((value) => !value)) {
        alert('Please select all variations.');
        return;
      }
      item = {
        id: product.id,
        cartId: variationId? variationId: product.id,
        name: product.name,
        price: salePrice || price,
        quantity: quantity,
        image: product.images[0] || '',
        attributes: selectedAttributes,
      };
    } else {
      item = {
        id: product.id,
        cartId: product.id.toString(),
        name: product.name,
        price: salePrice || price,
        quantity: quantity,
        image: product.images[0] || '',
        attributes: {},
      };
    }
    setIsAdding(true);

    setTimeout(() => {
      alert(`Product ${product.name} added to cart ${product.variation_id} with variations: ${JSON.stringify(selectedAttributes)}`);
      setIsAdding(false);
      user ? CartManager.addItem(item, user.id) : CartManager.addItem(item);
    }, 1000);
  };

  return (
    <>
      <div className="space-y-2">
        <Label>Quantity</Label>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-bold">{quantity}</span>
          <Button variant="outline" size="icon" onClick={() => setQuantity((q) => q + 1)}>
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Button disabled={isAdding ||  hasVariations && selectedAttributes == null} onClick={handleAddToCart} className="flex-1">
          Add to Cart
        </Button>
        <Button disabled={isAdding || hasVariations && !selectedAttributes} onClick={handleAddToCart} variant="dark" className="flex-1">
          Buy Now
        </Button>
      </div>
    </>
  );
};

export default AddToCart;
