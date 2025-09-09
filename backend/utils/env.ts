import {z} from "zod";

export const envSchema = z.object({
  APP_NAME: z.string().min(1),
  PORT: z.coerce.number().min(1).max(65535).default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]),

  MONGO_CONNECTION_STRING: z.string(),

  MAILTRAP_API_TOKEN: z.string().min(1),

  MAILTRAP_SENDER_EMAIL: z.email(),
  MAILTRAP_SENDER_NAME: z.string().min(1),
  MAILTRAP_COMPANY_NAME: z.string().min(1),
  MAILTRAP_ACCOUNT_ID: z.coerce.number().min(1),

  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES_IN: z.string().default("1h"),
  JWT_COOKIE_NAME: z.string().min(1),
  JWT_COOKIE_MAX_AGE_IN_MS: z.coerce.string().refine((s) => parseInt(s, 10) > 0),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);