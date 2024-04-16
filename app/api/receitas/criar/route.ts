import prisma from "@/src/lib/db";
import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try{
    const body = await req.json();
    const receitaJaExistente = await db.receita.findFirst({
      where: {
        nome: body.nome,
        ingredientes: body.ingredientes,
        comoFazer: body.comoFazer,
      }
    })
    if(receitaJaExistente){
      return NextResponse.json({message: "Receita já existe"}, {status: 400});
    }
    else{
      const receita = await db.receita.create({
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
    return NextResponse.json({message: "Erro ao criar receita"}, {status: 500})
  }
}
