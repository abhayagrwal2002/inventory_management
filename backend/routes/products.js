const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "xyz";

// Route 1
router.get('/fetchallproducts', fetchuser, async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id });
        res.json(products)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2
router.post('/addproduct',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('price', 'Price must be in Number'),
  ], fetchuser,async (req, res) => {
    try {
        const { name, price, category } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const Products = new Product({
            name, price, category, user: req.user.id
        })
        const saveProducts = await Products.save();
        res.json(saveProducts);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 3: Update an existing Note using: POST "api/products/updateproduct". Login required
router.put("/updateproduct/:id", fetchuser, async (req, res) => {
    const { name, price, category } = req.body;
  
    // Create a newProduct object
    try {
      const newProduct = {};
      if (name) {
        newProduct.name = name;
      }
      if (price) {
        newProduct.price = price;
      }
      if (category) {
        newProduct.category = category;
      }
  
      // Find the note to be updated and update it
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send("Not Found");
      }
  
      if (product.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
  
      product = await Product.findByIdAndUpdate(req.params.id,{ $set: newProduct },{ new: true });
      res.json({ product });
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


  // ROUTE 4: Delete an existing product using: POST "/api/products/deleteproduct". Login required
router.delete("/deleteproduct/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
  
    try {
      // Find the note to be delete and delete it
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send("Not Found");
      }
  
      // Allow deletion only if user owns this Note
      if (product.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
  
      product = await Product.findByIdAndDelete(req.params.id);
      res.json({ success: "Note has been deleted", product: product });
    } 
    
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
module.exports = router;