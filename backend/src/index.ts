import express, { Request, Response } from 'express';
import { authenticateStudent, authenticateAccessToken, authenticateRefreshToken, UserInfoToken, generateAccessToken, generateRefreshToken, tokenGetUserInfo } from './auth';
import { SERVER_PORT } from '../../config.json';
import { getDb } from './config/db';
import { testDb } from './config/testdb';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
const db = getDb();

app.use(express.json());
dotenv.config();

app.get('/', (req: Request, res: Response) => {
  console.log('Hello, TypeScript with Express :)))!');
  res.send('Hello, TypeScript with Express :)))!');
});

app.post('/zIdLogin', async(req: Request, res: Response) => {
  const zId = req.body.zID;
  const password = req.body.password;
  
  if (!zId || !authenticateStudent(zId, password)) {
    res.status(401).send("INVALID LOGIN CREDENTIALS");
    return;
  }

  const userInfo = await tokenGetUserInfo(zId);
  if (!userInfo) {
    res.status(404).send("USER NOT FOUND");
    return;
  }

  const user = {
    userId: zId,
    email: userInfo.email
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);
  res.json({accessToken: accessToken, refreshToken: refreshToken});
});

// Returns a new access token if refresh token is valid
app.post('/getNewToken', async(req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  const user = await authenticateRefreshToken(refreshToken);
  if (!user) {
    res.status(403).send("INVALID REFRESH TOKEN");
    return;
  }
  
  const newAccessToken = generateAccessToken(user);

  res.json(newAccessToken);
})


//For testing tokens and also exmaple of using authenticateAccessToken
app.get('/checkValidToken', (req: Request, res: Response) => {
  const user = authenticateAccessToken(req.headers['authorization']);
  console.log(user);

  if (!user) {
    res.sendStatus(403);
    return;
  }

  res.json("access granted :)");
})

// This function does not destroy the access token since those will be stored in the frontend
// Pls destroy tokens on the frontend :)
app.post('/logout', async(req: Request, res: Response) => {
  const userRefreshToken = await authenticateRefreshToken(req.body.refreshToken);


  if (userRefreshToken) {
    await db.refreshToken.delete({
      where: {
        id: userRefreshToken.jti
      }
    })
  }

  // If userRefreshToken is already invalid just return;
  res.json("User Logged Out");
})

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});

