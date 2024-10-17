import express, { Request, Response, RequestHandler } from 'express';
import jwt from "jsonwebtoken";
import { authenticateStudent } from './auth';
import { SERVER_PORT } from '../../config.json';
import dotenv from "dotenv";
// import {testDb } from './config/testdb';

const app = express();
dotenv.config();

const authenticateAccessToken = (token: string) => {
  let userId;
  try {
    userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
  } catch(err) {
    return undefined;
  }

  return userId
}

app.get('/', (req: Request, res: Response) => {
  console.log('Hello, TypeScript with Express :)))!');
  res.send('Hello, TypeScript with Express :)))!');
});

app.get('/login', (req: Request, res: Response) => {
  const zID = req.query.zID as string;
  const password = req.query.password as string;
  
  if (!zID || !authenticateStudent(zID, password)){
    res.status(401).send("INVALID LOGIN INPUT");
    return;
  }

  const user = {userId: 123} // Replace with function to get user info
  // I'll try to make it after rewatching the prisma vid

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {algorithm: "HS256", expiresIn: "15m"});
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, {algorithm: "HS256", expiresIn: "90d"})
  res.send({accessToken: accessToken, refreshToken: refreshToken});
});

// // Planning to repurpose this for testing. Will make one after I learn prisma

// app.get('/validatejwt', (req: Request, res: Response) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) {
//     res.status(401).send("INVALID TOKEN");
//     return;
//   }
//   const token = authHeader.split(' ')[1];
//   const userId = authenticateAccessToken(token);
//   if (!userId)

//   res.json("OK");
// })

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});


// testDb();