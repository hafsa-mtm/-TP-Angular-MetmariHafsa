const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let cart = [];

app.get("/api/products", (req, res) => {
  // Update product keys to match your frontend model
let products = [
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

  res.send(products);
});

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

const port = 3000;

app.listen(port, () => console.log(`API Server listening on port ${port}`));


