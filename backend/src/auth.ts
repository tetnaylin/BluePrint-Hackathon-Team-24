import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export interface UserInfoToken {
    userId: string;
    email: string;
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
export const authenticateAccessToken = (authHeader: string | undefined): UserInfoToken | undefined => {
  
    if (!authHeader) {
      return undefined;
    }
    const token = authHeader.split(' ')[1];
  
    try {
        const user: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        console.log(user)
        return {userId: user.userId, email: user.email};
    } catch (e) {
        return undefined;
    }

  }

export const authenticateRefreshToken = (refreshToken: string | undefined): UserInfoToken | undefined => {
  
    if (!refreshToken) {
        return undefined;
    }

    try {
        const user: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
        console.log(user)
        return {userId: user.userId, email: user.email};
    } catch (e) {
        return undefined;
    }
}
