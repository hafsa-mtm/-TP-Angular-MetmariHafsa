const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const app = express();

// Sample products array moved outside routes to reuse
const products = [
  {
    productId: 1,
    productTitle: "Laptop",
    productPrice: 1200,
    quantity: 5,
    description: "High-end gaming laptop",
    imageUrl: "assets/images/laptop.jpg"
  },
  {
    productId: 2,
    productTitle: "Mouse",
    productPrice: 20,
    quantity: 25,
    description: "Wireless mouse",
    imageUrl: "assets/images/mouse.jpg"
  },
  {
    productId: 3,
    productTitle: "Tablette",
    productPrice: 300,
    quantity: 2,
    description: "27 inch 4K monitor",
    imageUrl: "assets/images/tablette.jpg"
  }
];

// Enhanced CORS configuration with logging
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

// Serve static files with error handling
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  fallthrough: false // Don't continue to next middleware if file not found
}));

let cart = [];

// Add health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Return all products
app.get("/api/products", (req, res) => {
  console.log('Products endpoint hit');
  res.json(products);
});

// Return single product by ID
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.productId === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = 3000;
app.listen(port, '0.0.0.0', () => { // Listen on all network interfaces
  console.log(`API Server running on http://localhost:${port}`);
  console.log(`And also on http://127.0.0.1:${port}`);
  console.log(`CORS enabled for http://localhost:4200`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
