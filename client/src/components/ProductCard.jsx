import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext'; // Import useCart hook

function ProductCard({ product }) {
  const { addToCart } = useCart(); // Get addToCart function from context

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation when clicking button
    e.stopPropagation(); // Prevent event bubbling up to the Link
    addToCart(product);
    // Optionally: Add user feedback like a toast notification
    console.log(`${product.name} added to cart`);
  };

  // Basic card structure - styling and details can be enhanced
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <img
          // Construct the image URL assuming the API serves images from /images
          src={`http://localhost:3001/images/${product.imageUrl}`}
          alt={product.name}
          className="w-full h-48 object-cover" // Basic image styling
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-700 text-sm mb-3">{product.description.substring(0, 100)}...</p> {/* Truncate description */}
          <p className="font-bold text-blue-600">KES {product.price.toLocaleString()}</p> {/* Updated currency */}
        </div>
      </Link>
      <div className="p-4 pt-0"> {/* Add padding for the button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Add prop validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
