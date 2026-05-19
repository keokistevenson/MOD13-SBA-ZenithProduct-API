// DEPENDENCIES

const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

// MIDDLEWARE

// ROUTES
app.get("/", (req, res)=>{
    res.send("Server is running.");
})

// PORTS
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}.`);
})
