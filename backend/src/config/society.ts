import { getDb } from "./db";
import { Attendee } from "./attendee";
import { SocietyEvent } from "./society-event";

const db = getDb();

export interface Society {
    googleId: string,
    name: string,
    email: string,
    members?: Attendee[],
    events?: SocietyEvent[]
}

export const updateSociety = async (newSociety: Society) => {
    const updatedSociety = await db.society.update( {
        where: {
            googleId: newSociety.googleId,
        },
        data: {
            name: newSociety.name,
            email: newSociety.email,
        }
    });

    return updatedSociety;
};

export const createSociety = async (newSociety: Society) => {
    const createdSociety = await db.society.create( {
        data: {
            googleId: newSociety.googleId,
            name: newSociety.name,
            email: newSociety.email
        }
    });

    return createdSociety;
};
