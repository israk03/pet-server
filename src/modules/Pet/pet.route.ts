import express from 'express';
import { PetController } from './pet.controller.js';
import auth, { UserRole } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', auth(UserRole.owner), PetController.createPet);
router.get('/', auth(UserRole.owner), PetController.getAllPets);
router.get('/:id', auth(UserRole.owner), PetController.getSinglePet);


export const PetRoutes = router;
