import prisma from "@/src/lib/db";
import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request){
  try{
    const body = await req.json();
    const receitaJaExiste = await prisma.receita.findFirst({
      where: {
        nome: body.nome,
        ingredientes: body.ingredientes,
        comoFazer: body.comoFazer,
        autorId: {not: body.autorId}
      }
    })
    if(receitaJaExiste){
      return NextResponse.json({message: "Receita já existe"}, {status: 400});
    }
    else{
      const receita = await prisma.receita.update({
        where: {
          id: body.id
        },
        data: {
          nome: body.nome,
          imagem: body.imagem,
          ingredientes: body.ingredientes,
          comoFazer: body.comoFazer,
          autorId: body.autorId
        }
      });
      return NextResponse.json({status: 200});
    }
  }
  catch(error){
    return NextResponse.json({message: "Erro ao editar receita"}, {status: 500})
  }
}
