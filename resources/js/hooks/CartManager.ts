import axios from "axios";

export interface CartData {
    id: string;
    cartId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    attribute_name:string;
    attribute_value:string;
    
}

export class CartManager {
    static getCart(): CartData[] {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    static saveCart(cart: CartData[]): void {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static addItem(item: CartData, userId:any): void {
        const cart = this.getCart();
        const existingItemIndex = cart.findIndex(CartData => CartData.cartId === item.cartId);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += item.quantity;
        } else {
            cart.push(item);
        }

        this.saveCart(cart);
        this.saveCartToDatabase(userId, cart);
    }

    static updateItem(itemId: string, quantity: number): void {
        const cart = this.getCart();
        const itemIndex = cart.findIndex(CartData => CartData.cartId === itemId);

        if (itemIndex !== -1) {
            if (quantity <= 0) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = quantity;
            }
            this.saveCart(cart);
        }
    }

    static removeItem(userId:string, itemId: string): void {
        // let cartId = itemId.replace(/[^0-9]/g, "");
        const cart = this.getCart();
        const updatedCart = cart.filter(CartData => CartData.cartId !== itemId);
        this.saveCart(updatedCart);
        this.removeCartItemDatabase(userId, itemId)
    }

    static clearCart(): void {
        localStorage.removeItem('cart');
    }

    static getTotalItems(): number {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    static getTotalPrice(): number {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Fetch cart from the database using userId
    static async fetchCartFromDatabase(userId: string): Promise<CartData[]> {
        // try {
            const response = await fetch(`/api/usercart/${userId}/cart/${userId}`);
            if (response) {
                return await response.json();
                console.log(response);
            } else {
                console.error("Failed to fetch cart from database");
                return [];
            }
        // } catch (error) {
        //     console.error("Error fetching cart from database:", error);
        //     return [];
        // }
    }

    // Sync local cart with database
    static async syncCart(userId: string): Promise<void> {
        const localCart = this.getCart();
        const databaseCart = await this.fetchCartFromDatabase(userId);
        console.log('Database Cart' , databaseCart);
        // const updatedCart = localCart.map(item => {
        //     const databaseItem = databaseCart.find(cartItem => cartItem.cartId === item.cartId);
        //     if (databaseItem) {
        //         return { ...item, quantity: databaseItem.quantity };
        //         } else
        //         return item;
        //         });
        const mergedCart = this.mergeCarts(localCart, databaseCart);
        console.log('mergedCart', mergedCart);
        // Save merged cart both locally and remotely
        this.saveCart(mergedCart);
        if(databaseCart.length > 0){
            try {
                const response = await fetch(`/api/usercart/${userId}/cart/${userId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    //body: JSON.stringify(cart),
                });
                 console.log("Delete response", response)
                if (!response.ok) {
                    console.error("Failed to delete cart to database", response);
                }
            } catch (error) {
                console.error("Error delete cart to database:", error);
            }

            await this.saveCartToDatabase(userId, mergedCart);
        }else{
        await this.saveCartToDatabase(userId, mergedCart);
        }


    }

     // Merge local cart with database cart
     private static mergeCarts(localCart: CartData[], databaseCart: CartData[]): CartData[] {
        const cartMap = new Map<string, CartData>();

        // Add database cart items to the map
        for (const item of databaseCart) {
            cartMap.set(item.cartId, { ...item });
        }

        // Merge local cart items into the map
        for (const item of localCart) {
            if (cartMap.has(item.cartId)) {
                const existingItem = cartMap.get(item.cartId)!;
                existingItem.quantity = item.quantity; // Combine quantities
            } else {
                cartMap.set(item.cartId, { ...item });
            }
        }

        return Array.from(cartMap.values());
    }

    // Save cart to the database
    static async saveCartToDatabase(userId: string, cart: CartData[]): Promise<void> {
        try {
            const response = await fetch(`/api/usercart/${userId}/cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cart),
            });
            console.log('Send Cart data',JSON.stringify(cart))
             console.log("response", response)
            if (!response.ok) {
                console.error("Failed to save cart to database", response);
            }
        } catch (error) {
            console.error("Error saving cart to database:", error);
        }
    }

    static async removeCartItemDatabase(userId:string, itemId:string){
        try {
            const response = await fetch(`/api/cart/item/${userId}/${itemId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                //body: JSON.stringify(cart),
            });
            if (!response.ok) {
                console.error("Failed to delete cart Item to database", response);
            }
        } catch (error) {
            console.error("Error delete cart Item to database:", error);
        }
    }
    
}