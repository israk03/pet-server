import { Request, Response } from "express";

export function notFound(req: Request, res: Response){
    res.status(404).json({
        message: "This route is not available at the moment...",
        path: req.originalUrl,
        date: Date()
    })
}