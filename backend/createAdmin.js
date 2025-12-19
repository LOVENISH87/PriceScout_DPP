import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const adminEmail = "admin@pricescout.com";
        const adminPassword = "admin123";

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
            name: "Master Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        console.log("*****************************************");
        console.log("Admin Account Created Successfully!");
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log("*****************************************");

        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
