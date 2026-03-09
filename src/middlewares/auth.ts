
import { NextFunction, Request, Response } from "express"
import  jwt  from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { AuthUser } from "../types/express.js";




export enum UserRole  {
    admin = "ADMIN", 
    owner = "OWNER",
    sitter = "SITTER"
}

const auth = (...roles: UserRole[]) =>{
  return async (req: Request, res: Response, next: NextFunction)=>{


    try {

            // is token exist
            // verify token
            // decoded user exist in database or not
            // check user role
            // is users is active or not

            
      const authHeader = req.headers.authorization;
     

      if (!authHeader) {
        throw new Error("No token provided");
      }

      const token = authHeader.split(" ")[1];
      // console.log("Extracted Token:", token);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      //console.log("Decoded:", decoded);

      const userData = await prisma.user.findUnique({
        where: { email: decoded.email },
      });

      //console.log("User from DB:", userData);

      if (!userData) {
        throw new Error("User not found");
      }

      if (userData.status !== "ACTIVE") {
        throw new Error("User not active");
      }

      if (roles.length && !roles.includes(decoded.role)) {
        console.log("Role mismatch:", decoded.role);
        throw new Error("Role not allowed");
      }

      req.user = decoded as AuthUser;
      next();
    } catch (error: any) {
      console.log("Auth Error:", error);

  let message = "Unauthorized";

  if (error.name === "TokenExpiredError") {
    message = "Token has expired, please login again";
  } else if (error.name === "JsonWebTokenError") {
    message = "Invalid token";
  }

  return res.status(401).json({
    success: false,
    message,
  });
    }



        

    }
}

export default auth;