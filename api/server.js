import 'dotenv/config'; // Load environment variables from .env file (ESM way)
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url'; // Needed for __dirname in ESM
import { anthropic } from '@ai-sdk/anthropic'; // Import anthropic function
import { streamText } from 'ai'; // Import streamText (remove toDataStream)
import { getProducts } from './ai-tools.js'; // Import our defined tools (add .js extension for ESM)

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

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

// --- AI Chat Endpoint ---

// No explicit client initialization needed when using the function directly

// Define the system prompt for the AI sales agent
const systemPrompt = `You are a friendly and helpful AI sales assistant for 'AI ShopAssist', an online store selling various AI-powered software tools.
Your goal is to assist users, answer questions about the products, and help them find the right tool for their needs.
You have access to a tool called 'getProducts' which you MUST use whenever you need to list, describe, compare, or recommend products.
The product prices are in Kenyan Shillings (KES).
Be conversational and engaging. Ask clarifying questions if the user's request is unclear.
Do not make up products or features not listed in the product data obtained via the tool.`; // Use normal backticks

// POST /api/chat endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body; // Expect messages in the request body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: 'Invalid request body: messages array is required.' });
  }

  try {
    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'), // Use the imported function directly
      system: systemPrompt,
      messages: messages, // Pass the chat history
      tools: {
        getProducts, // Provide the getProducts tool
        // Add other tools here if defined
      },
      // Add callbacks based on documentation
      onError: (error) => {
        console.error("AI Stream Error:", error);
        // Error handling is already present below, but this logs it earlier
      },
      onFinish: ({ text, finishReason, usage }) => {
        console.log("AI Stream Finished.");
        console.log(`  Finish Reason: ${finishReason}`);
        console.log(`  Usage: ${JSON.stringify(usage)}`);
        // console.log(`  Final Text: ${text}`); // Optional: Log final text if needed
      },
    });

    // Use the documented helper to pipe the data stream to the response
    result.pipeDataStreamToResponse(res);

  } catch (error) {
    // This catch block handles errors during the initial setup or if streamText itself throws synchronously
    console.error("Error in /api/chat endpoint (outside stream):", error);
    // Ensure error response is sent correctly if headers not already sent
    if (!res.headersSent) {
       res.status(500).json({ message: 'Error processing chat request.' });
    } else {
       // If headers already sent (mid-stream error), just end the response abruptly
       res.end();
    }
  }
});

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('AI ShopAssist API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); // Use normal backticks
});
