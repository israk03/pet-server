import { Request, Response } from "express";
import { PetService } from "./pet.service.js";
import sendResponse from "../../utils/sendResponse.js";
import { AuthUser } from "../../types/express.js";

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

// get all pets controller
const getAllPets = async(req: Request, res: Response)=>{
    try {
        const result = await PetService.getAllPetsFromDB((req.user as AuthUser)?.id)
        
        sendResponse(res,{
            status: 200,
            success: true,
            message: "Pets fetched successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res,{
            status: 500,
            success: false,
            message: "Failed to fetch pets",
            data: error
        })
    }
}

// get single pet controller
const getSinglePet = async(req: Request, res: Response)=>{
    try {
        const result = await PetService.getSinglePetFromDB(req.params?.id as string)
        sendResponse(res,{
            status: 200,
            success: true,
            message: "Pet fetched successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res,{
            status: 500,
            success: false,
            message: "Failed to fetch pet",
            data: error
        })
    }
}

export const PetController = {
    // Add controller methods here
    createPet,
    getAllPets,
    getSinglePet
    };

