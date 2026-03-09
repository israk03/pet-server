-- CreateTable
CREATE TABLE "sitterProfiles" (
    "id" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "hourlyRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sitterId" TEXT NOT NULL,

    CONSTRAINT "sitterProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sitterProfiles_sitterId_key" ON "sitterProfiles"("sitterId");

-- AddForeignKey
ALTER TABLE "sitterProfiles" ADD CONSTRAINT "sitterProfiles_sitterId_fkey" FOREIGN KEY ("sitterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
