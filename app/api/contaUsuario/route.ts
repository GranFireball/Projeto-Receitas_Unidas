import prisma from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try{
    const body = await req.json();
    const contaUsuario = await db.contaUsuario.findFirst({
      where: {
        usuario: body.usuario,
        senha: body.senha
      },
      select: {
        id: true
      }
    });
    if(contaUsuario){
      return NextResponse.json(contaUsuario, {status: 200});
    }
    else{
      return NextResponse.json({message: "Login incorreto"}, {status: 400});
    }
  }
  catch(error){
    return NextResponse.json({message: "Erro ao fazer login"}, {status: 500});
  }
}
