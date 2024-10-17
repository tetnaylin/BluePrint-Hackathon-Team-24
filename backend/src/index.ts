import express, { Request, Response } from 'express';
import { authenticateStudent, authenticateAccessToken, authenticateRefreshToken, UserInfoToken } from './auth';
import { SERVER_PORT } from '../../config.json';
import { getDb } from './config/db';
import { testDb } from './config/testdb';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
const db = getDb();

app.use(express.json());
dotenv.config();


const tokenGetUserInfo = async(zId: string) => {
  const user = await db.attendee.findUnique({
    where: {
      zId: zId
    },
    select: {
      email: true
    }
  });

  if (user === null) return undefined;

  return {userId: zId, email: user.email};
}

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

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {algorithm: "HS256", expiresIn: "20s"});
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, {algorithm: "HS256", expiresIn: "1d"})
  res.send({accessToken: accessToken, refreshToken: refreshToken});
});


app.post('/getNewToken', (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  const user = authenticateRefreshToken(refreshToken);
  if (!user) {
    res.status(403).send("INVALID REFRESH TOKEN");
    return;
  }
  const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {algorithm: "HS256", expiresIn: "20s"});

  res.json(newAccessToken);
})


//For testing tokens
app.get('/checkValidToken', (req: Request, res: Response) => {
  const user = authenticateAccessToken(req.headers['authorization']);
  console.log(user);

  if (!user) {
    res.sendStatus(403);
    return;
  }

  res.json("access granted :)");

})

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});


testDb();