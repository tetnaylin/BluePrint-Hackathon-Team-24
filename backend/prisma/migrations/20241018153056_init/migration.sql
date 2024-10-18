-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendee" (
    "zId" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discord" TEXT,
    "arcMember" BOOLEAN NOT NULL,
    "year" INTEGER
);
INSERT INTO "new_Attendee" ("arcMember", "discord", "email", "name", "year", "zId") SELECT "arcMember", "discord", "email", "name", "year", "zId" FROM "Attendee";
DROP TABLE "Attendee";
ALTER TABLE "new_Attendee" RENAME TO "Attendee";
CREATE UNIQUE INDEX "Attendee_email_key" ON "Attendee"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
