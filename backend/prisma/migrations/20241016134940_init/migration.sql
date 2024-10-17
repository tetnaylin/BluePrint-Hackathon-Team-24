-- CreateTable
CREATE TABLE "Attendee" (
    "zId" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discord" TEXT,
    "arcMember" BOOLEAN NOT NULL,
    "year" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Society" (
    "googleId" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "startDateTime" DATETIME NOT NULL,
    "endDateTime" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AttendanceResponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "attendeeId" TEXT,
    "formResponse" TEXT,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "AttendanceResponse_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee" ("zId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AttendanceResponse_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AttendeeToSociety" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AttendeeToSociety_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendee" ("zId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AttendeeToSociety_B_fkey" FOREIGN KEY ("B") REFERENCES "Society" ("googleId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EventToSociety" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EventToSociety_A_fkey" FOREIGN KEY ("A") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EventToSociety_B_fkey" FOREIGN KEY ("B") REFERENCES "Society" ("googleId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_email_key" ON "Attendee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_discord_key" ON "Attendee"("discord");

-- CreateIndex
CREATE UNIQUE INDEX "Society_email_key" ON "Society"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceResponse_attendeeId_eventId_key" ON "AttendanceResponse"("attendeeId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceResponse_formResponse_eventId_key" ON "AttendanceResponse"("formResponse", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendeeToSociety_AB_unique" ON "_AttendeeToSociety"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendeeToSociety_B_index" ON "_AttendeeToSociety"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSociety_AB_unique" ON "_EventToSociety"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSociety_B_index" ON "_EventToSociety"("B");
