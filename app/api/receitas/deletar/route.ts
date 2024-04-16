import prisma from "@/src/lib/db";
import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    await db.receita.findFirstOrThrow({
      where: {
        id: body.id
      }
    })
    await db.receita.delete({
      where: {
        id: body.id
      }
    });
    return NextResponse.json({ status: 200 });
  }
  catch (error) {
    return NextResponse.json({ message: "Erro ao deletar receita" }, { status: 500 })
  }
}
