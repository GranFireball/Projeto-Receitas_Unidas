import prisma from "@/src/lib/db";
import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try{
    const body = await req.json();
    const receita = await prisma.receita.findFirst({
      where: {
        id: body.id
      },
      select: {
        id: true,
        nome: true,
        imagem: true,
        ingredientes: true,
        comoFazer: true,
        autorId: true
      }
    })
    if(receita === null || receita === undefined){
      return NextResponse.json({status: 400});
    }
    else{
      return NextResponse.json(receita, {status: 200});
    }
  }
  catch(error){
    return NextResponse.json({message: "Erro ao obter receita"}, {status: 500});
  }
}
