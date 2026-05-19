
// Import/load mongoose library
const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name is required.'], trim: true},
    description:  {type: String, required: [true, 'Description is required.'], trim: true},
    price:  {type: Number, required: [true, 'Price is required.'], min: [0.01, 'Price must be greater than 0']},
    category:  {type: String, required: [true, 'Category is required.']},
    inStock: {type: Boolean, default: true},
    tags:  {type: [String], default: []},
    createdAt: {type: Date, default: Date.now}
});

// Create the Product model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;