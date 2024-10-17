import { getDb } from "./db";
import { Society } from "./society";
import { AttendanceResponse } from "./attendance-response";

const db = getDb();

export interface Attendee {
    zId: string,
    name: string,
    email: string,
    discord?: string,
    arcMember: boolean,
    year: number,
    societies?: Society[],
    response?: AttendanceResponse[]
}

export const upsertAttendeeProfile = async (newAttendee: Attendee) => {
    const upsertedAttendee = await db.attendee.upsert( {
        where: {
            zId: newAttendee.zId,
        },
        create: {
            zId: newAttendee.zId,
            name: newAttendee.name,
            email: newAttendee.email,
            discord: newAttendee.discord ?? "",
            arcMember: newAttendee.arcMember,
            year: newAttendee.year ?? 1
        },
        update: {
            name: newAttendee.name || undefined,
            email: newAttendee.email || undefined,
            discord: newAttendee.discord || undefined,
            arcMember: newAttendee.arcMember ? newAttendee.arcMember : undefined,
            year: newAttendee.year || undefined
        }
    });

    return upsertedAttendee;
};

export const joinSociety = async(attendee: Attendee, society: Society) => {
    const updatedAttendee = await db.attendee.update( {
        where: {
            zId: attendee.zId,
        },
        data: {
            societies: {
                connect: { googleId: society.googleId }
            }
        }
    });

    const updatedSociety = await db.society.update( {
        where: {
            googleId: society.googleId,
        },
        data: {
            members: {
                connect: { zId: attendee.zId }
            }
        }
    });

    return [updatedAttendee, updatedSociety];
}

export const leaveSociety = async(attendee: Attendee, society: Society) => {
    const updatedAttendee = await db.attendee.update( {
        where: {
            zId: attendee.zId,
        },
        data: {
            societies: {
                disconnect: { googleId: society.googleId }
            }
        }
    });

    const updatedSociety = await db.society.update( {
        where: {
            googleId: society.googleId,
        },
        data: {
            members: {
                disconnect: { zId: attendee.zId }
            }
        }
    });

    return [updatedAttendee, updatedSociety];

}