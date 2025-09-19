import moose from 'mongoose';
import type { User } from '../../../shared/user.type.ts';

export class UserDto {
  static toJson(user: moose.Document & User): Omit<User,
   'password' | 'verificationToken' | 'verificationTokenExpiresAt' | 'resetPasswordToken' | 'resetPasswordExpiresAt' | 'isVerified' | 'lastLogin'> | null {

    if (!user) return null;

    const { 
      password,
      verificationToken,
      verificationTokenExpiresAt,
      resetPasswordToken,
      resetPasswordExpiresAt,
      isVerified,
      lastLogin,
      ...safeData 
    } = user.toObject()

    return safeData;
  }
}