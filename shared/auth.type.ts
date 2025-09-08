import type z from "zod";
import type { BaseSignupSchema } from "./auth.schema.ts";

export type AuthInput = z.infer<typeof BaseSignupSchema>;