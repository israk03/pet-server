import express from 'express';
import auth, { UserRole } from '../../middlewares/auth.js';
import { SitterController } from './sitter.controller.js';

const router = express.Router();

router.post('/', auth(UserRole.sitter), SitterController.createSitter);
router.get('/', auth(UserRole.sitter), SitterController.getAllSitters);
router.patch('/booking/:id', auth(UserRole.sitter), SitterController.updateBooking);

export const SitterRoutes = router;
