import { useState, useEffect } from "react";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  isVariable: boolean;
  variations?: SelectedVariation[];
}

interface SelectedVariation {
  attributeName: string;
  attributeValue: string;
  additionalPrice: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  isVariable: boolean;
  stock: number;
}

interface Variation {
  productId: number;
  attributeName: string;
  attributeValue: string;
  additionalPrice: number;
  stock: number;
}

export const CartManager = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage or API
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart handler
  const addToCart = (
    product: Product,
    quantity: number,
    selectedVariations?: SelectedVariation[]
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.productId === product.id &&
          JSON.stringify(item.variations) === JSON.stringify(selectedVariations)
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: Date.now(),
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          isVariable: product.isVariable,
          variations: selectedVariations || [],
        },
      ];
    });
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
};
