import express from 'express';
import { PetController } from './pet.controller.js';
import auth, { UserRole } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', auth(UserRole.owner), PetController.createPet);

export const PetRoutes = router;
