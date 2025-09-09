import jwt from 'jsonwebtoken';
import { env } from './env.ts';

export  const generateVerificationToken = () => {
  return Math.floor(Math.random() * 900000 + 100000).toString();
};

export const calculateExpirationAt = (minutes: number) => {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60000);
}

export const generateJwt = (userId: string) => {
  const token = jwt.sign({ id: userId }, env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};