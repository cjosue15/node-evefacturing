import { Router } from 'express';
import authRoutes from './auth.route';
import categoryRoutes from './category.route';
import tagRoutes from './tag.route';
import productRoutes from './product.route';
import { AuthMiddleware } from '../middlewares';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/categories', [AuthMiddleware.verifyToken], categoryRoutes);
router.use('/api/tags', [AuthMiddleware.verifyToken], tagRoutes);
router.use('/api/products', [AuthMiddleware.verifyToken], productRoutes);

export default router;
