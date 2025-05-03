import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 mb-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">AI ShopAssist</Link>
        <div>
          <Link to="/" className="px-3 hover:text-gray-300">Products</Link>
          <Link to="/cart" className="px-3 hover:text-gray-300">Cart</Link>
          {/* Add cart count later */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
