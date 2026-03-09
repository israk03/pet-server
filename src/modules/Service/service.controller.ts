import { Request, Response } from "express";

import sendResponse from "../../utils/sendResponse.js";
import { AuthUser } from "../../types/express.js";
import { ServiceService } from "./service.service.js";

// create service controller
const createService = async(req: Request, res: Response)=>{
    try {
        const result = await ServiceService.createServiceIntoDB(req.body, (req.user as any)?.id)
        
        sendResponse(res,{
            status: 201,
            success: true,
            message: "Service created successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res,{
            status: 500,
            success: false,
            message: "Failed to create service",
            data: error
        })
    }
}

// get services controller
const getServices = async(req: Request, res: Response)=>{
    try {
        const result = await ServiceService.getAllServicesFromDB((req.user as AuthUser)?.id)
        
        sendResponse(res,{
            status: 200,
            success: true,
            message: "Services fetched successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res,{
            status: 500,
            success: false,
            message: "Failed to fetch service",
            data: error
        })
    }
}







export const ServiceController = {
    // Add controller methods here
    createService,
    getServices,
   
};