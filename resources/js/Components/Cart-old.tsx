import { CartManager } from "@/hooks/CartManager-old";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = CartManager();

  const calculateTotal = () =>
    cart.reduce(
      (total, item) =>
        total +
        (item.price +
          (item.variations?.reduce((sum, v) => sum + v.additionalPrice, 0) || 0)) *
          item.quantity,
      0
    );

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price.toFixed(2)}</p>
              {item.variations && (
                <div>
                  {item.variations.map((variation, index) => (
                    <p key={index}>
                      {variation.attributeName}: {variation.attributeValue} (+₹
                      {variation.additionalPrice.toFixed(2)})
                    </p>
                  ))}
                </div>
              )}
              <div>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value, 10))
                    }
                  />
                </label>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ₹{calculateTotal().toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
