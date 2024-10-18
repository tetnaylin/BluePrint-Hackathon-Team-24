import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getDb } from './config/db';

dotenv.config();

const db = getDb();

export interface UserInfoToken {
    userId: string;
    email: string;
}

export interface UserRefreshToken {
    userId: string;
    email: string;
    jti: string;
}

interface RefreshToken {
    id: string;
}

// It's for the backend, so I think it's fine if we export this
// Input: (zID: string, password: string)
// Output: Boolean(promise) and console.errors
export async function authenticateStudent(zID: string, password: string): Promise<boolean> {
    if (process.env.NODE_ENV !== 'development') {
        if (/^[a-zA-Z0-9]+$/.test(zID) || !/^z[0-9]{7}$/.test(zID)) {

        const payload = { zid: zID, zpass: password };
        const verifyResponse = await fetch('https://verify.csesoc.unsw.edu.au/v1', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (verifyResponse.ok) {
            console.log(`STUDENT=${zID} is logged in`);
            return true;
        }

        if (verifyResponse.status === 401) {
            console.error(`Failed to login STUDENT=${zID} due to INCORRECT PASSWORD`);
        } else {
            console.error(
            `Failed to login STUDENT=${zID} due to ERROR CODE ${verifyResponse.status}`,
            );
        }
        return false;
        }

        // if unexpected characters are found, immediately reject
        console.error(`Failed to login STUDENT=${zID} due to INVALID FORMAT`);
        return false;
    }
    return true;
}

export const tokenGetUserInfo = async(zId: string) => {
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

export const authenticateAccessToken = (authHeader: string | undefined): UserInfoToken | undefined => {
  
    if (!authHeader) {
      return undefined;
    }
    const token = authHeader.split(' ')[1];
  
    try {
        const user: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        console.log(user);
        return {userId: user.userId, email: user.email};
    } catch (e) {
        return undefined;
    }

  }

export const authenticateRefreshToken = async (refreshToken: string | undefined): Promise<UserRefreshToken | undefined> => {
  
    if (!refreshToken) {
        return undefined;
    }

    try {
        const user: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
        
        const validToken = await db.refreshToken.findUnique({
            where: {
                id: user.jti
            }
        })
        if (!validToken || validToken === null) return undefined
        return {userId: user.userId, email: user.email, jti: user.jti};
    } catch (e) {
        return undefined;
    }
}

export const generateAccessToken = (payload: UserInfoToken) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {algorithm: "HS256", expiresIn: "20s"});
}

export const generateRefreshToken = async(payload: UserInfoToken) => {
    const randomId = crypto.randomUUID();
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {algorithm: "HS256", expiresIn: "90d", jwtid: randomId});
    await db.refreshToken.create({
        data: {
            id: randomId
        }
    })

    return refreshToken;
}