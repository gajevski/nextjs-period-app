-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Period" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" TEXT NOT NULL
);
INSERT INTO "new_Period" ("id", "startDate") SELECT "id", "startDate" FROM "Period";
DROP TABLE "Period";
ALTER TABLE "new_Period" RENAME TO "Period";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
