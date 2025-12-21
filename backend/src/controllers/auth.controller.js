import User from "../models/user.js";   //user schema!!
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// new user!! -> rreg!!!
// new user registration
export const register = async (req, resp) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resp.status(400).json({ message: "User already exists with this email!" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed
        });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        resp.status(201).json({ 
            message: "Successfully created User!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        resp.status(500).json({ message: "Something went wrong during registration!" });
    }
}

export const login = async (req, resp) => {
    try {
        const { email, password } = req.body; // 'email' field now serves as Identifier (Email or Name)

        const user = await User.findOne({ 
            $or: [
                { email: email },
                { name: email }
            ]
        });
        if (!user) return resp.status(401).json({ message: "Invalid Identifier or password!" });

        const isVerify = await bcrypt.compare(password, user.password);
        if (!isVerify) return resp.status(401).json({ message: "Invalid email or password!" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        resp.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        resp.status(500).json({ message: "Something went wrong during login!" });
    }
}

export const updateProfile = async (req, resp) => {
    try {
        const { name, password } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return resp.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            user.password = hashed;
        }

        await user.save();

        resp.json({
            message: "Profile updated successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Update profile error:", error);
        resp.status(500).json({ message: "Failed to update profile" });
    }
}