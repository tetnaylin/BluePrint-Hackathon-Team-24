import { getDb } from "./db";
import { Attendee } from "./attendee";
import { SocietyEvent } from "./society-event";

const db = getDb();

export interface AttendanceResponse {
    id: number,
    attendee?: Attendee,
    formResponse: string,
    event: SocietyEvent
}

export const markAttendance = async (attendanceResponse: AttendanceResponse) => {
    const existingResponses = await db.attendanceResponse.findMany({
        where: {
          eventId: attendanceResponse.event.id,
          OR: [
            { attendeeId: attendanceResponse.attendee?.zId },
            { formResponse: attendanceResponse.formResponse }
          ],
        },
      });
    
      if (existingResponses.length > 0) {
        return new Error("Attendee has already submitted attendance for this event.");
      }

    const newAttendanceResponse = await db.attendanceResponse.create( {
        data: {
            formResponse: attendanceResponse.formResponse || undefined,
            attendeeId: attendanceResponse.attendee ? attendanceResponse.attendee.zId : undefined,
            eventId: attendanceResponse.event.id
        }
    });

    // const attendee = attendanceResponse.attendee;
    // const socEvent = attendanceResponse.event;


    // let updatedAttendee = {}
    // if(attendee) {
    //     updatedAttendee = await db.attendee.update( {
    //         where: {
    //             zId: attendee.zId
    //         },
    //         data: {
    //             responses: {
    //                 connect: { id: attendanceResponse.id }
    //             }
    //         }
    //     } );
    // }


    // const updatedEvent = await db.event.update( {
    //     where: {
    //         id: socEvent.id
    //     },
    //     data: {
    //         responses: {
    //             connect: { id: attendanceResponse.id }
    //         }
    //     }
    // } );

    return newAttendanceResponse;
}