/*
  Warnings:

  - Added the required column `room` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "room" TEXT NOT NULL;
