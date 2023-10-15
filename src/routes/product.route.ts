import { Router } from 'express';

import { productController } from '../controllers';

const router = Router();

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.get('/:id', productController.getProduct);

export default router;
