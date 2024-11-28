import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET_ID,
});

export async function POST(req: Request) {
  const { amount,userId,mentorId,status } = await req.json();

  console.log(userId , mentorId)
  const userExists = await prisma.user.findUnique({
    where: { id: "cm41hfzew0000izfshnlago2i" },
  });
   console.log(userExists)
  const mentorExists = await prisma.mentor.findUnique({
    where: { id: "cm41hk9wo0008izfshcyii4h5" },
  });
  console.log(mentorExists)
  if (!userExists || !mentorExists) {
    console.log("Nahi")
    return NextResponse.json({ error: "Invalid userId or mentorId" }, { status: 400 });
  }
  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    
  });

  console.log(order)

 const newOrder = await prisma.order.create({
      data:{
        id:order.id,
        amount:Number(order.amount),
        currency:order.currency,
        receipt:order.receipt,
        notes:JSON.stringify(order.notes),
        status:order.status,
        createdAt:new Date(order.created_at*1000),
        userId :"cm41hfzew0000izfshnlago2i",
        mentorId :"cm41hk9wo0008izfshcyii4h5"
      }
 })

 console.log(newOrder);

  return NextResponse.json(order);
}