import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        console.log("Registration request received:", { name, email });

        if (!name || !email || !password) {
            console.log("Missing fields");
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        console.log("Connecting to DB...");
        await connectDB();
        console.log("DB connected");
        console.log("Checking if user exists...");
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists");
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Hash the password
        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log("Password hashed");

        // Create user
        console.log("Creating user...");
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        console.log("User created:", newUser._id);

        return NextResponse.json(
            { message: "User registered successfully", user: { id: newUser._id, name, email } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("LOGGED Registration error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
