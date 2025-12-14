// app/api/auth/me/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = jwt.verify(token, JWT_SECRET);

    await connectDB();
    const user = await User.findById(payload.userId).select(
      "name email role age gender bmiCategory allergy deviceId deviceList selectedDevice image"
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          age: user.age,
          gender: user.gender,
          bmiCategory: user.bmiCategory,
          allergy: user.allergy,
          deviceId: user.deviceId,
          deviceList: user.deviceList || [],
          selectedDevice: user.selectedDevice || null,
          image: user.image || null,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("ME error:", err);
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
}
