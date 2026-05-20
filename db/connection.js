require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on("error", (err)=> console.log(err.message + " is MongoDB is not running?"));
db.on("connected", ()=> console.log("MongoDB is connected"));
db.on("disconnected", () => console.log("MongoDB is disconnected."));


