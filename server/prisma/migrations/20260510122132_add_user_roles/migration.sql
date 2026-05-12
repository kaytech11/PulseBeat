-- CreateEnum
CREATE TYPE "Role" AS ENUM ('LISTENER', 'ARTIST', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'LISTENER';
