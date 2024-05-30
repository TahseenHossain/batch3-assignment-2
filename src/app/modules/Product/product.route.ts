import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct);

router.get('/', ProductControllers.getAllProduct);

router.get('/search', ProductControllers.searchProduct);

router.get('/:productId', ProductControllers.getAProduct);

router.put('/:productId', ProductControllers.updateProduct);

router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
