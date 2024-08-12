import Product from "../models/Product.js";
import { multerUpload } from "../utils/multer.js";
import fs from 'fs'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

export const getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find({})
        res.json(products)
    }catch(error){
        res.status(500).json({message: "Server Error", error: error.message})
    }
}


// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin

export const createProduct = (req, res) => {
    multerUpload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { name, price, description, brand, category, countInStock,user } = req.body;
        console.log(req.file,'req file')
        try {
            const product = new Product({
                name,
                price,
                description,
                brand,
                category,
                countInStock,
                image: req.file ? req.file.path : 'no-image.jpg', // Save the image path
                user
            });

            const createdProduct = await product.save();
            res.status(201).json(createdProduct);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin

export const updateProduct = (req, res) => {
    multerUpload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { name, price, description, brand, category, countInStock } = req.body;

        try {
            const product = await Product.findById(req.params.id);

            if (product) {
                if (req.file) {
                    // Remove old image if it exists
                    if (product.image && product.image !== 'no-image.jpg') {
                        fs.unlinkSync(product.image);
                    }
                    product.image = req.file.path; // Update with new image
                }

                product.name = name || product.name;
                product.price = price || product.price;
                product.description = description || product.description;
                product.brand = brand || product.brand;
                product.category = category || product.category;
                product.countInStock = countInStock || product.countInStock;

                const updatedProduct = await product.save();
                res.json(updatedProduct);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });
};

export const deleteProduct = async(req,res)=>{
    const productId = req.params.id
    try{
        await Product.findByIdAndDelete(productId)
        res.json({message:'Product removed successfully'})
    }catch(error){
        res.status(500).json({message:'Internal Server Error', error:error.message})
    }
}