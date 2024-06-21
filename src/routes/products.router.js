import { Router } from 'express';
import * as controllers from '../controllers/product.controllers.js';

const router = Router();

router.post("/file", controllers.createFileProducts);

router.get("/", controllers.getAllProducts);

router.get("/:id", controllers.getProductById);

router.post("/", controllers.createProduct);

router.put("/:id", controllers.updateProduct);

router.delete("/:id", controllers.deleteProduct);

export default router