import express from 'express'
import {getAllProducts, getProductId, createNewProduct, updateProduct, deleteProduct} from "../controllers/productController.js"
import { validate } from '../middleware/validate.js'
import { createProductSchema, updateProductSchema } from '../schemas/productsSchemas.js'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProductId)
router.post('/', validate(createProductSchema), createNewProduct)
router.put('/:id', validate(updateProductSchema), updateProduct)
router.delete('/', deleteProduct)

export default router