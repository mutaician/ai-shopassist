import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Uncommented
import ProductListPage from './pages/ProductListPage'; // Uncommented
import ProductDetailPage from './pages/ProductDetailPage'; // Uncommented
import CartPage from './pages/CartPage'; // Uncommented
// import './App.css'; // Keep or remove default App styles as needed

function App() {
  return (
    <Router>
      <Header /> {/* Uncommented */}
      <main className="container mx-auto p-4"> {/* Basic container */}
        <Routes>
          <Route path="/" element={<ProductListPage />} /> {/* Updated */}
          <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Updated */}
          <Route path="/cart" element={<CartPage />} /> {/* Updated */}
          {/* Add a 404 Not Found route later if needed */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
