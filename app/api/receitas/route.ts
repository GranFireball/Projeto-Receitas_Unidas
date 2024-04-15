import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    const receitas = await db.receita.findMany();
    return NextResponse.json(receitas, {status: 200})
  }
  catch(error){
    return NextResponse.json({message: "Erro ao carregar receitas"}, {status: 500})
  }
}
