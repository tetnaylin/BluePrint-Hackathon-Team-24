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

export const upsertSociety = async (newSociety: Society) => {
    const upsertedSociety = await db.society.upsert( {
        where: {
            googleId: newSociety.googleId,
        },
        create: {
            googleId: newSociety.googleId,
            name: newSociety.name,
            email: newSociety.email,
        },
        update: {
            name: newSociety.name,
            email: newSociety.email,
        }
    });

    return upsertedSociety;
};
