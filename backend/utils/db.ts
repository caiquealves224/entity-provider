import mongoose from "mongoose";

import { env } from "./env.ts";

export async function connectToDatabase() {
  try {
    const mongo = await mongoose.connect(env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected successfully: ${mongo.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
