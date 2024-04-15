/*
  Warnings:

  - Added the required column `imagem` to the `Receita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Receita" ADD COLUMN     "imagem" TEXT NOT NULL;
