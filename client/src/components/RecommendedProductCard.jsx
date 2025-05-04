import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecommendedProductCard({ product }) {
  if (!product) {
    return null; // Don't render if product data isn't available yet
  }

  // Construct image URL (assuming backend serves images from /images)
  const imageUrl = product.imageUrl ? `http://localhost:3001/images/${product.imageUrl}` : '/placeholder.png'; // Add a fallback placeholder

  return (
    <div className="mt-2 mb-1 border rounded-lg overflow-hidden shadow-sm max-w-xs bg-white">
      <div className="flex items-center p-2">
        <img src={imageUrl} alt={product.name} className="w-16 h-16 object-cover mr-3 flex-shrink-0" />
        <div className="flex-grow">
          <h4 className="font-semibold text-sm text-gray-800">{product.name}</h4>
          <p className="text-xs text-gray-600 mb-1">KES {product.price.toLocaleString()}</p>
          <Link
            to={`/product/${product.id}`}
            className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

RecommendedProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    price: PropTypes.number.isRequired,
  }),
};

export default RecommendedProductCard;
