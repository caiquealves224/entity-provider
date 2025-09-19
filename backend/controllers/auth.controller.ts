import type { Request, Response } from 'express';
import UserModel from '../models/user.model.ts';
import { generateJwt, generateVerificationToken, setTokenCookie } from '../utils/auth.utils.ts';
import { sendVerificationEmail } from '../services/mailtrap/mailtrap.service.ts';
import { UserDto } from '../models/DTOs/user.dto.ts';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
   const userAlreadyExists = await UserModel.findOne({ email });

    if (userAlreadyExists) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const verificationToken = generateVerificationToken();

    const newUser = new UserModel({
      name,
      email,
      password,
      verificationToken,
    });

    console.log('Creating user with data:', { name, email, verificationToken });

    await newUser.save();

    // todo: generate token jwt
    console.log('Generating JWT token and setting cookie');
    const token = generateJwt(newUser._id.toString());
    setTokenCookie(res, token);
    console.log('Generated JWT token:', token);

    // TODO: transform in asynchronous event
    // TODO: replace 'TODO' with actual recipient email
    await sendVerificationEmail(email, verificationToken);

    console.log('signup route hit');
    res.status(201).json({ 
      success: true,
      message: 'User created successfully',
      data: UserDto.toJson(newUser)
    });
  } catch (error: unknown) {
    console.error('Error occurred during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};