import {z} from 'zod';

export const BaseSignupSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.email(),
  password: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
});
