// app/api/user/update/route.js
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(request) {
    try {
        // 1. Verify Token
        const token = request.cookies.get("auth_token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const decoded = verifyJwt(token);
        if (!decoded) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        // 2. Connect DB
        await connectDB();

        // 3. Get Data
        const body = await request.json();
        const { name, age, gender, bmiCategory, allergy } = body;

        // 4. Update User
        const updatedUser = await User.findByIdAndUpdate(
            decoded.userId,
            {
                name,
                age,
                gender,
                bmiCategory,
                allergy,
            },
            { new: true, runValidators: true }
        ).select("-passwordHash"); // Exclude password

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
