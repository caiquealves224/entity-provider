import express, { type Request, type Response } from 'express';
import { env } from './utils/env.ts';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.redirect('/health');
});

app.get('/health', (req: Request, res: Response) => {
  try {
    res.status(200).json({ success: true, message: 'Service is healthy' });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).send('Server is not running');
  }
});

app.listen(Number(env.PORT), () => {
  console.log(`${env.APP_NAME} is running on ${env.NODE_ENV === 'development' ?
    'http://localhost' : '0.0.0.0'}:${Number(env.PORT)} in ${env.NODE_ENV} mode.`);
});