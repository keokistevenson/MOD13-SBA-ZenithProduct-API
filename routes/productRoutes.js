const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// POST /api/products (Create a Product)
router.post("/", (req, res) => {

    // PROMISE CHAINING STYLE:
    // Product.create creates the document and saves it to MongoDB automatically
    Product.create(req.body)
        .then(createdProduct => {
            console.log('Product created successfully:', createdProduct);
            res.status(201).json(createdProduct);
        })
        .catch(err => {
            console.error('Error creating product:', err);

            if (err.name === "ValidationError") {
                return res.status(400).json({
                    message: err.message
                });
            }

            res.status(400).json({ message: "Failed to create the product." });
        });
});


// GET /api/products (Read All Products with Advanced Querying)
router.get("/", async (req, res) => {
    try {

        // Destructure req.query
        const {category, minPrice, maxPrice, sortBy, page = 1, limit = 10} = req.query;

        // Build filter object dynamically
        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Build sort object dynamically
        let sort = {};

        if (sortBy === "price_asc") {
            sort.price = 1;
        } else if (sortBy === "price_desc") {
            sort.price = -1;
        }

        // Pagination
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber);

        res.status(200).json(products);

    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({
            message: "Failed to retrieve products."
        });
    }
});

// GET /api/products/:id (Read a Single Product)
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        console.log('Product retrieved successfully:', product);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error retrieving the requested product:", error);

        res.status(500).json({ message: "Failed to retrieve the requested product." });
    }
});

// PUT /api/products/:id (Update a Product)
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error("Error updating the requested product:", error);

        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }

        res.status(400).json({ message: "Failed to update the requested product." });
    }
});

// DELETE /api/products/:id (Delete a Product)
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({
            message: "Product deleted successfully.",
            deletedProduct: deletedProduct
        });
    } catch (error) {
        console.error("Error deleting the requested product:", error);

        res.status(500).json({ message: "Failed to delete the requested product." });
    }
});

module.exports = router;