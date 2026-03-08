
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// create user into database
const createUserIntoDB = async(payload: any)=>{

    const hashPassword = await bcrypt.hash(payload.password, 12);

    const result = await prisma.user.create({
        data: {...payload, password: hashPassword}
    })

    const {password, ...newResult} = result;

    return newResult;

}

// login user into database
const loginUserIntoDB = async(payload: any)=>{

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if(!user){
        throw new Error("User not found.")
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(payload.password, user.password);

    if(!isPasswordValid){
        throw new Error("Invalid password.")
    }
    
    const secret = process.env.JWT_SECRET as string;
   
    const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status 
    }

    const token = jwt.sign(userData,secret, {expiresIn: "30d"} )

    return {
        token,
        user: userData
    }

    

    

}

export const AuthService = {
    // Add service methods here
    createUserIntoDB,
    loginUserIntoDB
    };