import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route.js";
import { PetRoutes } from "../modules/Pet/pet.route.js";
import { SitterRoutes } from "../modules/Sitter/sitter.route.js";
import { ServiceRoutes } from "../modules/Service/service.route.js";
import { BookingRoutes } from "../modules/Booking/booking.route.js";

const router = Router();



const routerManager = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/pet',
        route: PetRoutes
    },
    {
        path: '/sitter',
        route: SitterRoutes
    },
    {
        path: '/service',
        route: ServiceRoutes
    },
    {
        path: '/booking',
        route: BookingRoutes
    },
]

routerManager.forEach((r)=> router.use(r.path, r.route));

export default router;