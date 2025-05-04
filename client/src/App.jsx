import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Uncommented
import ProductListPage from './pages/ProductListPage'; // Uncommented
import ProductDetailPage from './pages/ProductDetailPage'; // Uncommented
import CartPage from './pages/CartPage'; // Uncommented
import { useState } from 'react'; // Import useState
import ChatAgent from './components/ChatAgent'; // Import the ChatAgent component
// import './App.css'; // Keep or remove default App styles as needed

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat visibility

  const toggleChat = () => setIsChatOpen(!isChatOpen); // Toggle function

  return (
    <Router>
      <Header toggleChat={toggleChat} /> {/* Pass toggleChat to Header */}
      <main className="container mx-auto p-4 relative"> {/* Add relative positioning for absolute child */}
        <Routes>
          <Route path="/" element={<ProductListPage />} /> {/* Updated */}
          <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Updated */}
          <Route path="/cart" element={<CartPage />} /> {/* Updated */}
          {/* Add a 404 Not Found route later if needed */}
        </Routes>
      </main>
      {/* Pass isOpen and toggleChat to ChatAgent */}
      <ChatAgent isOpen={isChatOpen} toggleChat={toggleChat} />
    </Router>
  );
}

export default App;
