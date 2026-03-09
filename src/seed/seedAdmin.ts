import bcrypt from "bcryptjs"
import { UserRole } from "../middlewares/auth.js"
import { prisma } from "../lib/prisma.js";



const seedAdmin = async()=>{

    const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 12);

    const adminData = {
        name: "MainAdmin",
        email: "main.admin@example.com",
        role: UserRole.admin,
        password: hashPassword
    }

    // 1. is admin exist in database or not
    // 2. if not exist, then create admin
    // 3. if exist, then return the admin

    try {
        const isAdminExist = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        })
    
        if(isAdminExist){
            return isAdminExist;
        }

        const newAdmin = await prisma.user.create({
            data: adminData
        })
    
        console.log("Admin created successfully");
        return newAdmin;
        
    } catch (error) {
        console.log(error)
    } finally{
        await prisma.$disconnect();
    }




}

seedAdmin();

