/*
  Warnings:

  - You are about to drop the column `createdById` on the `Course` table. All the data in the column will be lost.
  - Made the column `courseId` on table `Lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropIndex
DROP INDEX "Course_createdById_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "createdById";

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "courseId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
