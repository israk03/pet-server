import { Request, Response } from "express";

import sendResponse from "../../utils/sendResponse.js";
import { AuthUser } from "../../types/express.js";
import { SitterService } from "./sitter.service.js";

// create sitter controller
const createSitter = async(req: Request, res: Response)=>{
    try {
        const result = await SitterService.createSitterIntoDB(req.body, (req.user as any)?.id)
        
        sendResponse(res,{
            status: 201,
            success: true,
            message: "Sitter created successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res,{
            status: 500,
            success: false,
            message: "Failed to create sitter",
            data: error
        })
    }
}

// get all sitters controller
const getAllSitters = async(req: Request, res: Response)=>{
    try {
        const result = await SitterService.getAllSittersFromDB((req.user as AuthUser)?.id)
        
        sendResponse(res,{
            status: 200,
            success: true,
            message: "Sitters fetched successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res,{
            status: 500,
            success: false,
            message: "Failed to fetch sitters",
            data: error
        })
    }
}

// get single sitter controller
// const getSingleSitter = async(req: Request, res: Response)=>{
//     try {
//         const result = await SitterService.getSingleSitterFromDB(req.params?.id as string)
//         sendResponse(res,{
//             status: 200,
//             success: true,
//             message: "Sitter fetched successfully",
//             data: result
//         })
//     } catch (error) {
//         sendResponse(res,{
//             status: 500,
//             success: false,
//             message: "Failed to fetch sitter",
//             data: error
//         })
//     }
// }





export const SitterController = {
    // Add controller methods here
    createSitter,
    getAllSitters,
    //getSingleSitter
};