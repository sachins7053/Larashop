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

    static addItem(item: CartData): void {
        const cart = this.getCart();
        const existingItemIndex = cart.findIndex(CartData => CartData.cartId === item.cartId);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += item.quantity;
        } else {
            cart.push(item);
        }

        this.saveCart(cart);
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

    static removeItem(itemId: string): void {
        const cart = this.getCart();
        const updatedCart = cart.filter(CartData => CartData.cartId !== itemId);
        this.saveCart(updatedCart);
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

    static async syncCart(): Promise<void> {
        const cart = this.getCart();
        try {
            await axios.post('/api/cart/sync', { cart });
        } catch (error) {
            console.error('Failed to sync cart:', error);
        }
    }

    static async fetchCart(): Promise<void> {
        try {
            const { data: remoteCart } = await axios.get('/api/cart');
            this.saveCart(remoteCart); 
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    }
}