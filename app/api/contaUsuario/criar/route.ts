import prisma from "@/src/lib/db";
import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try{
    const body = await req.json();
    const contaJaExistente = await prisma.contaUsuario.findFirst({
      where: {
        usuario: body.usuario,
      }
    })
    if(contaJaExistente === null || contaJaExistente === undefined){
      const contaUsuario = await prisma.contaUsuario.create({
        data: {
          usuario: body.usuario,
          senha: body.senha
        }
      });
      return NextResponse.json(contaUsuario, {status: 200});
    }
    else{
      return NextResponse.json({status: 400});
    }
  }
  catch(error){
    return NextResponse.json({message: "Erro ao cadastrar usuário"}, {status: 500});
  }
}
