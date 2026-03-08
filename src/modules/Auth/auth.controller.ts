import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";

// create user controller
const createUser = async(req: Request, res: Response)=>{
    try {
        const result = await AuthService.createUserIntoDB(req.body)
        
        sendResponse(res,{
            status: 201,
            success: true,
            message: "User created successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res,{
            status: 500,
            success: false,
            message: "Failed to create user",
            data: error
        })
    }
}

// login user controller
const loginUser = async(req: Request, res: Response)=>{
    try {
        const result = await AuthService.loginUserIntoDB(req.body)
        
        // Set the token in an HTTP-only cookie
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: "strict",
        })

        sendResponse(res, {
            status: 200,
            success: true,
            message: "User logged in successfully",
            data: result
        })
    } catch (error: any) {

        const message = error.message 
        const status = message === "Invalid password." || message === "User not found." ? 401 : 500;

        sendResponse(res, {
            status,
            success: false,
            message: "Failed to login user",
            data: null
        })
    }
}

export const AuthController = {
    // Add controller methods here
    createUser,
    loginUser
    };