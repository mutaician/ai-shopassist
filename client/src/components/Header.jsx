import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart
import PropTypes from 'prop-types'; // Import PropTypes

function Header({ toggleChat }) { // Accept toggleChat prop
  const { totalItems } = useCart(); // Get totalItems from context

  return (
    <header className="bg-gray-800 text-white p-4 mb-4 sticky top-0 z-10"> {/* Make header sticky */}
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">AI ShopAssist</Link>
        <div>
          <Link to="/" className="px-3 hover:text-gray-300">Products</Link>
          {/* Add AI Assistant Toggle Button */}
          <button
            onClick={toggleChat}
            className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            AI Assistant
          </button>
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

// Add prop validation
Header.propTypes = {
  toggleChat: PropTypes.func.isRequired,
};

export default Header;
