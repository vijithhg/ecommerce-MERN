import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";
const productRoutes = express.Router()


productRoutes.get('/', getAllProducts)
productRoutes.get('/:id',getProductById)
productRoutes.post('/', createProduct)
productRoutes.put('/:id',updateProduct)
productRoutes.delete('/:id',deleteProduct)

export default productRoutes