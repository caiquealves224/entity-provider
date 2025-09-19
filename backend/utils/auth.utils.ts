import jwt from 'jsonwebtoken';
import { env } from './env.ts';
import type { Response } from 'express';

export  const generateVerificationToken = () => {
  return Math.floor(Math.random() * 900000 + 100000).toString();
};

export const calculateExpirationAt = (minutes: number) => {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60000);
}

export const generateJwt = (userId: string) => {
  const token = jwt.sign({ id: userId }, env.JWT_SECRET_KEY, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
  return token;
};

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie(env.JWT_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: Number(env.JWT_COOKIE_MAX_AGE_IN_MS),
    path: '/',
    ...(env.NODE_ENV === 'production' ? { secure: true } : {}),
  });
}