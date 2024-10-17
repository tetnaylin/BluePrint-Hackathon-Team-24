import express, { Request, Response } from 'express';
import { SERVER_PORT } from '../../config.json';
import {testDb } from './config/testdb';

const app = express();




app.get('/', (req: Request, res: Response) => {
  console.log('Hello, TypeScript with Express :)))!');
  res.send('Hello, TypeScript with Express :)))!');
});


app.listen(SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});


testDb();