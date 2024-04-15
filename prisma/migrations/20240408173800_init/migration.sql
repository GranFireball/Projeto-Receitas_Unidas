/*
  Warnings:

  - Changed the type of `imagem` on the `Receita` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Receita" DROP COLUMN "imagem",
ADD COLUMN     "imagem" BYTEA NOT NULL;
