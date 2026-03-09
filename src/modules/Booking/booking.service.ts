import { Booking } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

// create booking into db
const createBookingIntoDB = async(payload: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>, userId: string)=>{

    // steps:
        // 1. check: is user exists
        // 2. check: is user the owner
        // 3. check: pet belongs to owner
        // 4. check: is service exists
        // 5. check: is sitter exists
        // 6. calculate total price
        // 7. final: create the booking


        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            throw new Error("User not found.")
        }

        const pet = await prisma.pet.findUnique({
            where: {
                id: payload.petId
            }
        })

        if(!pet){
            throw new Error("Pet not found")
        }

        if(pet.ownerId !== userId){
            throw new Error("You can book for your pets only.")
        }

        const service = await prisma.service.findUnique({
            where: {
                id: payload.serviceId
            }
        })

        if(!service){
            throw new Error("Service not found.")
        }

        const sitter = await prisma.sitterProfile.findUnique({
            where: {
                id: payload.sitterId
            }
        })

        if(!sitter){
            throw new Error("Sitter not found.")
        }

        

        // calculate total price

        const startTime = new Date(payload.startDate).getTime(); // millisecond
        const endTime = new Date(payload.endDate).getTime(); // millisecond

        if(endTime <= startTime){
            throw new Error("End date must be after start date.");
        }

        const duration = endTime - startTime;

        const durationInHour = duration / (1000*60*60);

        const totalPrice = durationInHour * service.price


        // make the book into db
        const result = await prisma.booking.create({
            data: {
                ...payload,
                totalPrice
            }
        })


        return result;

    

}

export const BookingService = {
    // Add service methods here
    createBookingIntoDB
};