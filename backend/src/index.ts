import express, { Request, Response } from 'express';
import {
  authenticateStudent,
  UserInfoToken,
  generateAccessToken,
  generateRefreshToken,
  tokenGetUserInfo,
  OAuthToken,
  authenticateAccessToken2,
  authenticateRefreshToken2
} from './auth';
import { SERVER_PORT } from '../../config.json';
import { getDb } from './config/db';
import { testDb } from './config/testdb';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Society, updateSociety, createSociety } from './config/society';
import { Attendee, createAttendeeProfile } from './config/attendee';
import errorHandler from 'middleware-http-errors';

const app = express();
const db = getDb();

app.use(express.json());
dotenv.config();

app.get('/', (req: Request, res: Response) => {
  console.log('Hello, TypeScript with Express :)))!');
  res.send('Hello, TypeScript with Express :)))!');
});

app.post('/zIdLogin', async(req: Request, res: Response) => {
  const zId = req.body.zId;
  const password = req.body.password;
  
  if (!zId || !authenticateStudent(zId, password)) {
    res.status(401).send("INVALID LOGIN CREDENTIALS");
    return;
  }

  const userInfo = await tokenGetUserInfo(zId);
  if (!userInfo) {
    res.json({accessToken: null, refreshToken: null, newUser: true});
    return;
  }

  const user = {
    userId: zId,
    email: userInfo.email,
    society: false
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);
  res.json({accessToken: accessToken, refreshToken: refreshToken, newUser: false});
});

app.post('/oauth', async(req: Request, res: Response) => {
  const OAuthToken = req.body;

  jwt.verify(OAuthToken, process.env.GOOGLE_OAUTH_SECRET as string);
  
  const decoded: OAuthToken = OAuthToken && jwt.decode(OAuthToken);

  const society: Society = {
    googleId: decoded.sub,
    name: decoded.name,
    email: decoded.email
  }
  const socInDb = (db.society.findUnique({where: { googleId: society.googleId } }));
  if (!socInDb) {
    res.json({accessToken: null, refreshToken: null, newUser: true});
    return;
  }
  await updateSociety(society);

  const payload: UserInfoToken = {
    userId: decoded.sub,
    email: decoded.email,
    society: true
  }

  const newRefreshToken = await generateRefreshToken(payload);
  const newAccessToken = generateAccessToken(payload);

  res.json({accessToken: newAccessToken, refreshToken: newRefreshToken, newUser: false});
})

// Returns a new access token if refresh token is valid
app.post('/getNewToken', authenticateRefreshToken2, async(req: Request, res: Response) => {
  const user = req.body;
  console.log(user);

  if (!user) {
    res.status(403).send("INVALID REFRESH TOKEN");
    return;
  }

  const newPayload = {
    userId: user.userId,
    email: user.email,
    society: user.society
  }
  
  const newAccessToken = generateAccessToken(newPayload);

  res.json({accessToken: newAccessToken});
})


//For testing tokens and also exmaple of using authenticateAccessToken
app.get('/checkValidToken', authenticateAccessToken2, (req: Request, res: Response) => {
  const user = res.locals.user;
  console.log(user)

  if (!user || user.society) {
    res.sendStatus(403);
    return;
  }

  res.json("access granted :)");
})

// This function does not destroy the access token since those will be stored in the frontend
// Pls destroy tokens on the frontend :)
app.post('/logout', authenticateRefreshToken2, async(req: Request, res: Response) => {
  const userRefreshToken = req.body;
  console.log(userRefreshToken)

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

app.post('/signUp/attendee', async(req: Request, res: Response) => {
  const { zId, name, email, discord, arcMember } = req.body;
  const year = JSON.parse(req.body.year);
  const payload: Attendee = {
    zId: zId,
    name: name,
    email: email,
    discord: discord,
    arcMember: arcMember,
    year: year
  }

  await createAttendeeProfile(payload);
  
  const tokenPayload = {
    userId: zId,
    email: email,
    society: false
  }

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = await generateRefreshToken(tokenPayload);

  res.json({accessToken: accessToken, refreshToken: refreshToken});
})

app.post('/signUp/society', async(req: Request, res: Response) => {
  const { googleId, name, email } = req.body;
  const payload: Society = {
    googleId: googleId,
    name: name,
    email: email
  }

  await createSociety(payload);

  const tokenPayload = {
    userId: googleId,
    email: email,
    society: true
  }

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = await generateRefreshToken(tokenPayload);

  res.json({accessToken: accessToken, refreshToken: refreshToken});
})

app.get('/event/all', authenticateAccessToken2, async(req: Request, res: Response) => {
  // const user = authenticateAccessToken(req.headers['authorization']);
  const user = res.locals.user;
  if (!user) {
    res.sendStatus(403);
  }

  if (user?.society) {
    const societyEvents = await db.society.findUnique({
      where: {
        googleId: user.userId
      },
      select: {
        events: true
      }
    });

    res.json(societyEvents);
    return;
  }

  const allEvents = await db.event.findMany();
  res.json({data: allEvents});
})

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});

app.use(errorHandler());