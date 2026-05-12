-- CreateTable
CREATE TABLE "RecentlyPlayed" (
    "id" TEXT NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "RecentlyPlayed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecentlyPlayed" ADD CONSTRAINT "RecentlyPlayed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyPlayed" ADD CONSTRAINT "RecentlyPlayed_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
