import { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.js";

export function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
){
    let statusCode = 500;
    let errMessage = "Internal server error.";
    let errorDetails = err;

    if(err instanceof Prisma.PrismaClientValidationError){
        ((statusCode = 400), (errMessage = "Incorrect body or missing a fields."));
    }

    res.status(statusCode);
    res.json({success: false, message: errMessage, error: errorDetails});
}