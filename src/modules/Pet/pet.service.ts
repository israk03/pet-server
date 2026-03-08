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

export const PetService = {

    // Add service methods here
    createPetIntoDB
};