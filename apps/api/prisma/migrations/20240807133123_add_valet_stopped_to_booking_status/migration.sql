/*
  Warnings:

  - The values [VALET_PICKED_UP] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('BOOKED', 'CHECKED_IN', 'VALET_ASSIGNED_FOR_CHECK_IN', 'VALET_STOPPED', 'CHECKED_OUT', 'VALET_ASSIGNED_FOR_CHECK_OUT', 'VALET_RETURNED');
ALTER TABLE "Booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TABLE "BookingTimeline" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "BookingStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'BOOKED';
COMMIT;
