require("dotenv").config();
const mongoose  = require('mongoose');
const colors=require ('colors');
// console.log(process.env.NODE_ENV);

const express = require ("express");

const app = express()
const connectDB = require("./config/db.config");
; 

connectDB();
app.use("/",require("./routes/root")) ; 

const PORT = process.env.PORT ||         1333;


const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware
app.use(cors({
    origin: 'http://localhost:      7654',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/", require('./routes/root'));
app.use("/auth", require('./routes/authRoutes'));
app.use("/authcn", require('./routes/userRoutes'));


// Connect to the database
connectDB();
app.use("/product",require("./routes/productRoutes"));



function generateProducts(count=100){

    const categories=["Beauty","Electronics","Pets","Food","Home","Kitchen"];

    const products=[];

    for(let i=1;i<=count;i++)
    products.push({
    name:`Products ${i}`,
    category:categories[Math.floor(Math.random()*categories.length)],
    price:parseFloat(Math.random()*100+1).toFixed(3),
    stock:Math.floor(Math.random()*100),
    rating:parseFloat((Math.random()*5).toFixed(1))


    });
    return products;
}

const products=generateProducts();
 fs.writeFileSync('products.json',JSON.stringify(products,null,2)); 
// Fix the mongoose connection event and server start logic
mongoose.connection.once("open", () => {
    console.log('Connected to our DATABASE');

    // Start the server after DB connection is open
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`.white.bgMagenta); // Corrected string interpolation
    });
})

