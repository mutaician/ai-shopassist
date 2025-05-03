import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart

function Header() {
  const { totalItems } = useCart(); // Get totalItems from context

  return (
    <header className="bg-gray-800 text-white p-4 mb-4 sticky top-0 z-10"> {/* Make header sticky */}
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">AI ShopAssist</Link>
        <div>
          <Link to="/" className="px-3 hover:text-gray-300">Products</Link>
          <Link to="/cart" className="px-3 hover:text-gray-300 relative"> {/* Add relative positioning */}
            Cart
            {totalItems > 0 && ( /* Conditionally render badge */
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
