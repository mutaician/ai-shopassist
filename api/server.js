const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Use promises for async file reading

const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable or default

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// Serve static images from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Path to the products data file
const productsFilePath = path.join(__dirname, 'data/products.json');

// --- API Endpoints ---

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const data = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (err) {
    console.error("Error reading products file:", err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// GET a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const data = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(data);
    const product = products.find(p => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error("Error reading products file:", err);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('AI ShopAssist API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
