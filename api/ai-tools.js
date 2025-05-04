import { tool } from 'ai';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url'; // Needed for __dirname in ESM

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the products data file
const productsFilePath = path.join(__dirname, 'data/products.json');

// Define the getProducts tool
const getProducts = tool({
  description: 'Get the list of available AI products with their details (name, description, price in KES).',
  parameters: z.object({}), // No parameters needed for this tool
  execute: async () => {
    console.log('AI Tool: Attempting to execute getProducts...');
    try {
      console.log('AI Tool: Reading products file:', productsFilePath);
      const data = await fs.readFile(productsFilePath, 'utf8');
      console.log('AI Tool: Products file read successfully.');
      const products = JSON.parse(data);
      console.log(`AI Tool: Parsed ${products.length} products. Returning data.`);
      // Return the product data (Vercel AI SDK expects the tool execution result)
      return products;
    } catch (err) {
      console.error("AI Tool: Error executing getProducts:", err);
      // Return an error message for the AI
      return { error: "Failed to retrieve product list." };
    }
  },
});

// Export the tools using ESM syntax
export {
  getProducts,
  // Add other tools here if needed later
};
