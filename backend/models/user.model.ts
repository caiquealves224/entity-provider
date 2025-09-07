import mongoose from "mongoose";
import bcrypt from "bcrypt";

import type { User } from "../user.type.ts";
import { calculateExpirationAt } from "../utils/auth.utils.ts";

const userSchema = new mongoose.Schema<User>({
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

userSchema.pre('save', async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);

    console.log('Hashing password before saving user', { password: this.password, salt });

    this.password = await bcrypt.hash(this.password, salt);
  }

  if(this.verificationToken && !this.verificationTokenExpiresAt) {
    this.verificationTokenExpiresAt = calculateExpirationAt(60 * 24); // 1 day
  }

  next();
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
