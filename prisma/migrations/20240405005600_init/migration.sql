-- CreateTable
CREATE TABLE "ContaUsuario" (
    "id" TEXT NOT NULL,
    "usuario" VARCHAR(20) NOT NULL,
    "senha" VARCHAR(20) NOT NULL,

    CONSTRAINT "ContaUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receita" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "ingredientes" VARCHAR(1000) NOT NULL,
    "comoFazer" VARCHAR(1000) NOT NULL,
    "autorId" TEXT NOT NULL,

    CONSTRAINT "Receita_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "ContaUsuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
