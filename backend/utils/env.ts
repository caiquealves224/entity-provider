import {z} from "zod";

export const envSchema = z.object({
  APP_NAME: z.string().min(1),
  PORT: z.coerce.number().min(1).max(65535).default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]),

  MONGO_CONNECTION_STRING: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);