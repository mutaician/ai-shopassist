import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity, clearCart, totalPrice, totalItems } = useCart();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is currently empty. <Link to="/" className="text-blue-500 hover:underline">Continue Shopping</Link></p>
      ) : (
        <div>
          {/* Cart Items List */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={`http://localhost:3001/images/${item.imageUrl}`} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">KES {item.price.toLocaleString()}</p> {/* Updated currency */}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 border rounded hover:bg-gray-100">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="px-2 py-1 border rounded hover:bg-gray-100">+</button> {/* Use addToCart to increment */}
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-4">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="text-right mb-6">
            <h2 className="text-2xl font-semibold">Total ({totalItems} items): KES {totalPrice.toLocaleString()}</h2> {/* Updated currency */}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button onClick={clearCart} className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition-colors">
              Clear Cart
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
              Proceed to Checkout (Placeholder)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
