-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "netAmountMinor" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "platformFeeMinor" INTEGER NOT NULL DEFAULT 0;
