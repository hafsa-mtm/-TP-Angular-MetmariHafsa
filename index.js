const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

let cart = [];

app.get("/api/products", (req, res) => {
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
  res.json(products);
});

app.post("/api/cart", (req, res) => {
  cart = req.body;
  res.status(201).json({ message: "Cart updated successfully" });
});

app.get("/api/cart", (req, res) => {
  res.json(cart);
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Server running on http://localhost:${port}`);
  console.log(`CORS enabled for http://localhost:4200`);
});
