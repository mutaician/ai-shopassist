import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import RecommendedProductCard from './RecommendedProductCard'; // Import the display component

function RecommendationCardLoader({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return; // Don't fetch if no ID is provided

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching recommended product:", err);
        setError("Could not load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Re-run effect if productId changes

  if (loading) {
    return <div className="mt-2 mb-1 p-2 text-xs text-gray-500 italic">Loading recommendation...</div>;
  }

  if (error) {
    return <div className="mt-2 mb-1 p-2 text-xs text-red-600">{error}</div>;
  }

  // Render the actual card once data is loaded
  return <RecommendedProductCard product={product} />;
}

RecommendationCardLoader.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default RecommendationCardLoader;
