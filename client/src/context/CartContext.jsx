import { createContext, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

// 1. Create Context
const CartContext = createContext();

// 2. Create Provider Component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // State to hold cart items

  // Function to add an item to the cart or increment quantity
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Increment quantity if item already exists
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Function to decrease quantity or remove item if quantity is 1
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // Remove item if quantity is 1 or item not found (shouldn't happen)
        return prevItems.filter((item) => item.id !== productId);
      }
    });
  };


  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items and total price using useMemo for optimization
  const cartSummary = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems, totalPrice };
  }, [cartItems]);

  // Value object provided by the context
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    totalItems: cartSummary.totalItems,
    totalPrice: cartSummary.totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 3. Custom Hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
