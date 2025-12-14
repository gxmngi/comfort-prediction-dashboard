import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userId } = jwt.verify(token, JWT_SECRET);
    const { deviceId } = await req.json();

    await connectDB();

    const user = await User.findById(userId);

    if (!user.deviceList.includes(deviceId)) {
      return NextResponse.json(
        { message: "Device not found in your device list" },
        { status: 400 }
      );
    }

    user.selectedDevice = deviceId;
    await user.save();

    return NextResponse.json(
      { message: "Device selected successfully", selectedDevice: deviceId },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error selecting device" },
      { status: 500 }
    );
  }
}
