require("dotenv").config();
const mongoose = require('mongoose');
const colors = require('colors');
const express = require('express');
const app = express();
const connectDB = require("../config/db.config");

connectDB(); // Ensure you connect to DB first

const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware setup
app.use(cors({
  origin: 'http://localhost:7654', // Fixed the format
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Routes setup
app.use("/", require("../routes/root"));
app.use("/auth", require('../routes/authRoutes'));
app.use("/authcn", require('../routes/userRoutes'));
app.use("/product", require("../routes/productRoutes"));

// Function to generate products
function generateProducts(count = 100) {
  const categories = ["Beauty", "Electronics", "Pets", "Food", "Home", "Kitchen"];
  const products = [];
  
  for (let i = 1; i <= count; i++) {
    products.push({
      name: `Product ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: parseFloat(Math.random() * 100 + 1).toFixed(3),
      stock: Math.floor(Math.random() * 100),
      rating: parseFloat((Math.random() * 5).toFixed(1))
    });
  }

  return products;
}

// Generate and write products to JSON
const products = generateProducts();
const fs = require('fs');
fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

// Mongoose connection and server start
mongoose.connection.once("open", () => {
  console.log('Connected to our DATABASE');
  
  app.listen(process.env.PORT || 1333, () => {
    console.log(`Server running on port ${process.env.PORT || 1333}`.white.bgMagenta); // Corrected string interpolation
  });
});
