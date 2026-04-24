-- CreateTable
CREATE TABLE "SavedTweet" (
    "id" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "transformed" TEXT NOT NULL,
    "context" TEXT,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedTweet_pkey" PRIMARY KEY ("id")
);
