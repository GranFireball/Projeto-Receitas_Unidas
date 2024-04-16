import prisma from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    const receitas = await prisma.receita.findMany();
    return NextResponse.json(receitas, {status: 200})
  }
  catch(error){
    return NextResponse.json({message: error}, {status: 500})
  }
}
