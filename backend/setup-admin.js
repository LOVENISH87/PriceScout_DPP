import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/user.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const adminName = 'admin';
        const adminEmail = 'admin@pricescout.com';
        const adminPass = 'admin123';

        // Check if admin name or email already exists
        let admin = await User.findOne({ 
            $or: [ { name: adminName }, { email: adminEmail } ] 
        });
        
        const hashed = await bcrypt.hash(adminPass, 10);

        if (admin) {
            console.log(`User found (ID: ${admin._id}). Updating to Admin status...`);
            admin.name = adminName;
            admin.email = adminEmail;
            admin.password = hashed;
            admin.role = 'admin';
            await admin.save();
        } else {
            console.log('Creating new admin user...');
            await User.create({
                name: adminName,
                email: adminEmail,
                password: hashed,
                role: 'admin'
            });
        }

        console.log('\n--- ADMIN ACCOUNT READY ---');
        console.log(`Username: ${adminName}`);
        console.log(`Email:    ${adminEmail}`);
        console.log(`Password: ${adminPass}`);
        console.log('---------------------------\n');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
