import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and Email are required.' },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: { name, email },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.error();
  }
}
