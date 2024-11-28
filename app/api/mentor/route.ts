import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, bio } = await req.json();

    const mentor = await prisma.mentor.create({
      data: {
        name,
        email,
        bio,
      },
    });

    return NextResponse.json(mentor, { status: 201 });
  } catch (error) {
    console.error("Error adding mentor:", error);
    return NextResponse.json({ error: "Failed to add mentor" }, { status: 500 });
  }
}
