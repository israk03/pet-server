import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { BookingService } from "./booking.service.js";

// create booking controller
const createBooking = async(req: Request, res: Response)=>{
    try {
        const result = await BookingService.createBookingIntoDB(req.body, (req.user as any)?.id)
        
        sendResponse(res,{
            status: 201,
            success: true,
            message: "Booking made successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res,{
            status: 500,
            success: false,
            message: "Failed to make booking",
            data: error
        })
    }
}

export const BookingController = {
    // Add controller methods here
    createBooking
    };