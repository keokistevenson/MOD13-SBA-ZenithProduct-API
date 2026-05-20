// DEPENDENCIES

const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3001;

const productRoutes = require("./routes/productRoutes");


// MIDDLEWARE
app.use(express.json());  // Necessary to automatically parse JSON into JavaScript object and place it in req.body
app.use(express.urlencoded({ extended: true })); // Used for old school HTML form submissions. Content-Type: application/x-www-form-urlencoded

// DATABASE
const connectDB = require("./db/connection");
connectDB;

// ROUTES
app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
    res.send("Server is running.");
})

// PORTS
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}.`);
})
