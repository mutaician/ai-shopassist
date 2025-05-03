import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetailPage() {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching product ${id}:`, err);
        if (err.response && err.response.status === 404) {
          setError('Product not found.');
        } else {
          setError('Failed to load product details.');
        }
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run effect if the ID changes

  if (loading) {
    return <div className="text-center p-10">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        <p>{error}</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    // Should ideally be caught by error state, but good fallback
    return <div className="text-center p-10">Product data unavailable.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Products</Link>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={`http://localhost:3001/images/${product.imageUrl}`}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
          {/* Add to Cart button will go here */}
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            Add to Cart (Placeholder)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
