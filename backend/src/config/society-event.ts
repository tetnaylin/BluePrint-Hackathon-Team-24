import { getDb } from "./db";
import { Society } from "./society";
import { AttendanceResponse } from "@prisma/client";

const db = getDb();

export interface SocietyEvent {
    id: string,
    name: string,
    image?: string,
    description?: string,
    startDateTime: Date
    endDateTime: Date
    societies: Society[],
    responses?: AttendanceResponse[],
}

export const upsertSocietyEvent = async (newSocietyEvent: SocietyEvent) => {
    const upsertedSocietyEvent = await db.event.upsert( {
        where: {
            id: newSocietyEvent.id,
        },
        create: {
            id: newSocietyEvent.id,
            name: newSocietyEvent.name,
            image: newSocietyEvent.image ?? "",
            description: newSocietyEvent.description ?? "",
            startDateTime: newSocietyEvent.startDateTime,
            endDateTime: newSocietyEvent.endDateTime,
            societies: {
                connect: newSocietyEvent.societies ? 
                newSocietyEvent.societies.map(
                    society => ( { 
                        googleId: society.googleId 
                    } )) 
                    : undefined
            }
        },
        update: {
            name: newSocietyEvent.name || undefined,
            image: newSocietyEvent.image || undefined,
            description: newSocietyEvent.description || undefined,
            startDateTime: newSocietyEvent.startDateTime || undefined,
            endDateTime: newSocietyEvent.endDateTime || undefined,
            societies: {
                connect: newSocietyEvent.societies ? 
                newSocietyEvent.societies.map(
                    society => ( { 
                        googleId: society.googleId 
                    } )) 
                    : undefined
            }
        }
    });

    return upsertedSocietyEvent;
};