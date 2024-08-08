"use client";
import { useUser } from "@clerk/nextjs";
let prisma: any;

async function initializePrisma() {
  if (typeof window === 'undefined') { // Ensure this runs in a Node.js environment
    const { PrismaClient } = await import('@prisma/client');
    prisma = new PrismaClient();
  }
}

export async function GET() {
  try {
    await initializePrisma();
    const { user } = useUser()
    console.log("got to GET")
    if (!user) {
        return new Response('Not signed in', { status: 400 });
    }
    if (user.primaryEmailAddress) {
      console.log("email:", user.primaryEmailAddress.emailAddress)
    // Trying to get the user's email address

    // const rows = await prisma.inbox.findMany({
    //     where: {
    //         send_to: {
    //         equals: req.body,
    //         },
    //     },
    // });
    }
    return new Response(JSON.stringify("fjslkafasl"), { status: 200 });
  } catch (error) {
    console.error("Error in GET function:", error);
    return new Response('Internal Server Error', { status: 500 });
  }
}