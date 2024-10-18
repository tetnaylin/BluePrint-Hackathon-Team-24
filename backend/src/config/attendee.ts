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

export const updateAttendeeProfile = async (newAttendee: Attendee) => {
    const upsertedAttendee = await db.attendee.update( {
        where: {
            zId: newAttendee.zId,
        },
        data: {
            name: newAttendee.name,
            email: newAttendee.email,
            discord: newAttendee.discord ?? "",
            arcMember: newAttendee.arcMember,
            year: newAttendee.year ?? 1
        }
    });

    return upsertedAttendee;
};

export const createAttendeeProfile = async (newAttendee: Attendee) => {
    const upsertedAttendee = await db.attendee.create( {
        data: {
            zId: newAttendee.zId,
            name: newAttendee.name,
            email: newAttendee.email,
            discord: newAttendee.discord ?? "",
            arcMember: newAttendee.arcMember,
            year: newAttendee.year ?? 1
        }
    });

    return upsertedAttendee;
};

export const getAttendeeFromID = async(zId: string): Promise<Attendee | null> => {
    const data = await db.attendee.findUnique( {
        where: {
            zId: zId
        }
    });

    if(!data) {
        return null;
    }

    return {
        zId: data?.zId,
        name: data?.name,
        email: data?.email,
        discord: data?.discord ?? "",
        arcMember: data?.arcMember,
        year: Number(data?.year)
    };
}

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