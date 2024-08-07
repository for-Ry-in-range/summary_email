"use client";
import { currentUser } from '@clerk/nextjs/server';
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
    const user = await currentUser();
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
    //         equals: user.primaryEmailAddress.emailAddress,
    //         },
    //     },
    // });
    }
    return new Response(JSON.stringify("Successful"), { status: 200 });
  } catch (error) {
    console.error("Error in GET function:", error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
