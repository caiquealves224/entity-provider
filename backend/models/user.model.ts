import mongoose from "mongoose";

import type { User } from "../user.type.ts";

const userSchema = new mongoose.Schema<User>({
  id: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  lastLogin: { type: Date, required: true, default: Date.now },
  isVerified: { type: Boolean, required: true, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpiresAt: { type: Date },
  verificationToken: { type: String },
  verificationTokenExpiresAt: { type: Date },
}, { timestamps: true });

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
