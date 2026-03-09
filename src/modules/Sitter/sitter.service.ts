import { prisma } from "../../lib/prisma.js";

// create sitter into database
const createSitterIntoDB = async(payload: any, userId: string)=>{

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!user){
        throw new Error("User not found");
    }



    const result = await prisma.sitterProfile.create({
        data: {...payload, sitterId: user.id}
    })

    

    return result;

}

// get all sitters from database
const getAllSittersFromDB = async(userId: string)=>{
    

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    })

    if(!user){
        throw new Error("User not found");
    }

    const result = await prisma.sitterProfile.findMany({
        where: {
            sitterId: user.id
        },
        include: {
            user: true,
        }
        
    })    

    return result;

}

// get single sitter from database
// const getSingleSitterFromDB = async(petId: string)=>{

//     const result = await prisma.pet.findUnique({
//         where: {
//             id: petId
//         }
//     })    

//     return result;

// }



export const SitterService = {
    // Add service methods here
    createSitterIntoDB,
    getAllSittersFromDB,
    //getSingleSitterFromDB
};