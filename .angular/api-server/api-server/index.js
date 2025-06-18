const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const app = express();

// Updated products array with watches
const products = [
  // Men's Watches (10 items)
  {
    productId: 1,
    productTitle: "Emporio Armani AR1648",
    productPrice: 299,
    quantity: 8,
    description: "Classic black dial with stainless steel bracelet, 50m water resistance",
    imageUrl: "assets/images/men/Emporio Armani – AR1648.PNG",
    category: "Men's Watches"
  },
  {
    productId: 2,
    productTitle: "Emporio Armani Silver Dial AR1677",
    productPrice: 349,
    quantity: 5,
    description: "Two-tone silver dial with rose gold accents, date display",
    imageUrl: "assets/images/men/Emporio Armani – Silver Dial Two-tone AR1677.PNG",
    category: "Men's Watches"
  },
  {
    productId: 3,
    productTitle: "Emporio Armani AR1918",
    productPrice: 279,
    quantity: 10,
    description: "Black chronograph with tachymeter bezel, leather strap",
    imageUrl: "assets/images/men/Emporio Armani AR1918.PNG",
    category: "Men's Watches"
  },
  {
    productId: 4,
    productTitle: "Emporio Armani AR1919",
    productPrice: 325,
    quantity: 7,
    description: "Skeleton dial design with exhibition case back",
    imageUrl: "assets/images/men/Emporio Armani AR1919.PNG",
    category: "Men's Watches"
  },
  {
    productId: 5,
    productTitle: "Emporio Armani AR80009",
    productPrice: 399,
    quantity: 4,
    description: "Premium automatic movement with power reserve indicator",
    imageUrl: "assets/images/men/Emporio Armani AR80009.PNG",
    category: "Men's Watches"
  },
  {
    productId: 6,
    productTitle: "GC Executive Chrono Mesh",
    productPrice: 199,
    quantity: 12,
    description: "Chronograph with mesh bracelet, luminous hands",
    imageUrl: "assets/images/men/GC – Executive Chrono Mesh Y27004G1MF.PNG",
    category: "Men's Watches"
  },
  {
    productId: 7,
    productTitle: "Guess Blue Dial W1168G1",
    productPrice: 159,
    quantity: 15,
    description: "Blue sunray dial with stainless steel case",
    imageUrl: "assets/images/men/Guess – Blue Dial W1168G1.PNG",
    category: "Men's Watches"
  },
  {
    productId: 8,
    productTitle: "Guess GW0051G2",
    productPrice: 175,
    quantity: 9,
    description: "Minimalist design with brown leather strap",
    imageUrl: "assets/images/men/Guess – GW0051G2.PNG",
    category: "Men's Watches"
  },
  {
    productId: 9,
    productTitle: "Guess W0500G1",
    productPrice: 189,
    quantity: 11,
    description: "Chronograph with black PVD coating",
    imageUrl: "assets/images/men/Guess – W0500G1.PNG",
    category: "Men's Watches"
  },
  {
    productId: 10,
    productTitle: "Guess W0668G4",
    productPrice: 165,
    quantity: 6,
    description: "Rose gold-tone case with white dial",
    imageUrl: "assets/images/men/Guess – W0668G4.PNG",
    category: "Men's Watches"
  },

  // Women's Watches (8 items)
  {
    productId: 11,
    productTitle: "Emporio Armani AR0746",
    productPrice: 269,
    quantity: 8,
    description: "Rose gold with mother-of-pearl dial, crystal markers",
    imageUrl: "assets/images/women/Emporio Armani – AR0746.PNG",
    category: "Women's Watches"
  },
  {
    productId: 12,
    productTitle: "Emporio Armani AR1909",
    productPrice: 289,
    quantity: 5,
    description: "Silver-tone bracelet watch with diamond accents",
    imageUrl: "assets/images/women/Emporio Armani – AR1909.PNG",
    category: "Women's Watches"
  },
  {
    productId: 13,
    productTitle: "Emporio Armani Classic Diamonds",
    productPrice: 499,
    quantity: 3,
    description: "Luxury watch with diamond hour markers",
    imageUrl: "assets/images/women/Emporio Armani – Classic Diamonds AR3170.PNG",
    category: "Women's Watches"
  },
  {
    productId: 14,
    productTitle: "Emporio Armani AR11244",
    productPrice: 329,
    quantity: 7,
    description: "Gold-tone case with white dial and date window",
    imageUrl: "assets/images/women/Emporio Armani AR11244.PNG",
    category: "Women's Watches"
  },
  {
    productId: 15,
    productTitle: "Guess Black Steel",
    productPrice: 179,
    quantity: 9,
    description: "Black PVD stainless steel with minimalist dial",
    imageUrl: "assets/images/women/Guess – Black Steel U0933L4.PNG",
    category: "Women's Watches"
  },
  {
    productId: 16,
    productTitle: "Guess Montauk Gold",
    productPrice: 199,
    quantity: 6,
    description: "Gold-tone mesh bracelet with sunray dial",
    imageUrl: "assets/images/women/Guess – Montauk Gold W0933L2.PNG",
    category: "Women's Watches"
  },
  {
    productId: 17,
    productTitle: "Guess W0638L4",
    productPrice: 169,
    quantity: 10,
    description: "Two-tone bracelet with Roman numerals",
    imageUrl: "assets/images/women/Guess – W0638L4.PNG",
    category: "Women's Watches"
  },
  {
    productId: 18,
    productTitle: "Guess Collection Lady Chic",
    productPrice: 229,
    quantity: 4,
    description: "Rectangular case with genuine leather strap",
    imageUrl: "assets/images/women/Guess Collection – Lady Chic Y05008M1.PNG",
    category: "Women's Watches"
  }
];

// Rest of your server code remains the same...
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  fallthrough: false
}));

let cart = [];

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.get("/api/products", (req, res) => {
  console.log('Products endpoint hit');
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.productId === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`API Server running on http://localhost:${port}`);
  console.log(`And also on http://127.0.0.1:${port}`);
  console.log(`CORS enabled for http://localhost:4200`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});