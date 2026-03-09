import express from 'express';
import auth, { UserRole } from '../../middlewares/auth.js';
import { ServiceController } from './service.controller.js';

const router = express.Router();

router.post('/', auth(UserRole.sitter), ServiceController.createService );
router.get('/', auth(UserRole.sitter), ServiceController.getServices);

export const ServiceRoutes = router;
