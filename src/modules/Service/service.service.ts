import { prisma } from "../../lib/prisma.js";

// create service into database
const createServiceIntoDB = async(payload: any, userId: string)=>{

    const sitterProfile = await prisma.sitterProfile.findUnique({
        where: {
            sitterId: userId
        }
    })

    if(!sitterProfile){
        throw new Error("Sitter not found");
    }



    const result = await prisma.service.create({
        data: {...payload, sitterId: sitterProfile.id}
    })

    

    return result;

}

// get services from database
const getAllServicesFromDB = async(userId: string)=>{
    

    const sitterProfile = await prisma.sitterProfile.findUnique({
        where: {
            sitterId: userId
        }
    })

    if(!sitterProfile){
        throw new Error("Sitter not found");
    }

    const result = await prisma.service.findMany({
        where: {
            sitterId: sitterProfile.id
        },
        include: {
            sitter: true,
        }
        
        
    })    

    return result;

}


export const ServiceService = {
    // Add service methods here
    createServiceIntoDB,
    getAllServicesFromDB
};