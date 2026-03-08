import { Request, Response } from "express";
import { PetService } from "./pet.service.js";
import sendResponse from "../../utils/sendResponse.js";

// create pet controller
const createPet = async(req: Request, res: Response)=>{
    try {
        const result = await PetService.createPetIntoDB(req.body, (req.user as any)?.id)
        
        sendResponse(res,{
            status: 201,
            success: true,
            message: "Pet created successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res,{
            status: 500,
            success: false,
            message: "Failed to create pet",
            data: error
        })
    }
}

export const PetController = {
    // Add controller methods here
    createPet
    };