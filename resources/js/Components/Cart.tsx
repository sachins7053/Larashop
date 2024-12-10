"use client"
import { useState } from "react";
import { CartManager, CartData } from "@/hooks/CartManager"

import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon, ShoppingCart, X } from "lucide-react"
import { usePage } from "@inertiajs/react";

export function Cart(){
 
    const  user :any = usePage().props.auth.user;
    const [CartDatas, setCartDatas] = useState<CartData[]>(CartManager.getCart());
    console.log('CartDataS',CartDatas)
    const handleUpdateItem = (itemId: string, quantity: number) => {
        CartManager.updateItem(itemId, quantity);
        setCartDatas(CartManager.getCart());
    };

    const handleRemoveItem = (itemId: string, userid?:any ,) => {

        CartManager.removeItem( itemId, userid,);
        setCartDatas(CartManager.getCart());
    };

    const handleClearCart = () => {
        CartManager.clearCart();
        setCartDatas([]);
    };

    const totalItems = CartManager.getTotalItems();
    const totalPrice = CartManager.getTotalPrice();

    return (
        <>
         <div className="flex flex-1 flex-col gap-4 overflow-auto py-4">
            {totalItems === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add items to your cart to see them here
                </p>
              </div>
            ) : (
                CartDatas.map(item => (
                <div
                  key={item.cartId}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover"
                      
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.attribute_name}: {item.attribute_value}
                      {item.attribute_name}: {item.attribute_value}
                    </p>
                    <p className="font-medium">₹{item.price}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateItem(item.cartId, item.quantity - 1)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateItem(item.cartId, item.quantity + 1)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {console.log("itemCartId",item.id,item.cartId); handleRemoveItem(user.id, item.cartId); }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
             
                </div>
              )) 
            )}
          </div>
          {CartDatas.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <Button className="mt-4 w-full">Checkout</Button>
            </div>
          )}
        
        </>
    )
}