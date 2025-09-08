import {Router} from "express";
import { signup } from "../controllers/auth.controller.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { BaseSignupSchema } from "../../shared/auth.schema.ts";

const router = Router();

router.post('/signup', validate(BaseSignupSchema, 'body'), signup);

router.post('/login', (req, res) => {
  // Login logic here
  res.status(200).send('User logged in');
});

router.post('/logout', (req, res) => {
  // Logout logic here
  res.status(200).send('User logged out');
});

router.post('/request-password-reset', (req, res) => {
  // Password reset request logic here
  res.status(200).send('Password reset requested');
});

router.post('/reset-password', (req, res) => {
  // Password reset logic here
  res.status(200).send('Password has been reset');
});

router.get('/verify-email', (req, res) => {
  // Email verification logic here
  res.status(200).send('Email verified');
});

export default router;