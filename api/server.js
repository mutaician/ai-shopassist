import 'dotenv/config'; // Load environment variables from .env file (ESM way)
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url'; // Needed for __dirname in ESM
import { anthropic } from '@ai-sdk/anthropic'; // Import anthropic function
import { streamText } from 'ai'; // Import streamText
// Import both tools
import { getProducts, recommendProduct } from './ai-tools.js';

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

// Define the system prompt for the AI sales agent (Shortened)
const systemPrompt = `You are a friendly AI sales assistant for 'AI ShopAssist', an online store for AI software tools.
Assist users, answer product questions, and help them find the right tool.
You can recommend a specific product to the user using 'recommendProduct' tool: product is required
Use the 'getProducts' tool for product info (listing, describing, comparing).
Be conversational. Ask clarifying questions if needed.
Keep responses concise. Do not include product IDs.
Only use product data from the tool. Do not invent products or features.`;

// POST /api/chat endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body; // Expect messages in the request body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: 'Invalid request body: messages array is required.' });
  }

  // Limit message history to the last 8 messages to save tokens
  const recentMessages = messages.slice(-8);

  try {
    const result = await streamText({
      // Change model to Haiku for cost savings
      model: anthropic('claude-3-haiku-20240307'),
      system: systemPrompt, // Use shortened system prompt
      messages: recentMessages, // Pass the truncated chat history
      tools: {
        getProducts,
        recommendProduct, // Register the new tool
      },
      maxSteps: 5, // Allow multiple steps for tool execution and final response
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
