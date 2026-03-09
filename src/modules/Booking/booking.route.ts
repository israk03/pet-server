import express from 'express';
import { BookingController } from './booking.controller.js';
import auth, { UserRole } from '../../middlewares/auth.js';

const router = express.Router();

router.post("/",auth(UserRole.owner), BookingController.createBooking)

export const BookingRoutes = router;
