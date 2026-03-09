import { prisma } from "../../lib/prisma.js";

// create pet into database
const createPetIntoDB = async(payload: any, userId: string)=>{

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!user){
        throw new Error("User not found");
    }



    const result = await prisma.pet.create({
        data: {...payload, ownerId: userId}
    })

    

    return result;

}

// get all pets from database
const getAllPetsFromDB = async(userId: string)=>{

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!user){
        throw new Error("User not found");
    }

    const result = await prisma.pet.findMany({
        where: {
            ownerId: user.id
        }
    })    

    return result;

}

// get single pet from database
const getSinglePetFromDB = async(petId: string)=>{

    const result = await prisma.pet.findUnique({
        where: {
            id: petId
        }
    })    

    return result;

}

export const PetService = {

    // Add service methods here
    createPetIntoDB, 
    getAllPetsFromDB,
    getSinglePetFromDB
};