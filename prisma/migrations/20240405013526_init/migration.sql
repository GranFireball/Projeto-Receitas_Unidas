/*
  Warnings:

  - A unique constraint covering the columns `[usuario,senha]` on the table `ContaUsuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContaUsuario_usuario_senha_key" ON "ContaUsuario"("usuario", "senha");
