// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "researcher", "user"],
      default: "user",
    },
    // ข้อมูลเพิ่มสำหรับ Personal Info
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    bmiCategory: {
      type: String, // เช่น "Normal weight"
    },
    allergy: {
      type: String, // เช่น "Yes" หรือรายละเอียดแพ้
    },
    deviceId: {
      type: String, // ID ของ wearable เช่น EMO-00727
    },
    deviceList: [
      {
        type: String,
      }
    ],
    selectedDevice: {
      type: String
    },
    image: {
      type: String, // URL path to profile image
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
