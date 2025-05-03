import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

function ProductCard({ product }) {
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
          <p className="font-bold text-blue-600">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      {/* Add to Cart button will go here later */}
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
