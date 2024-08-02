"use client";
import { inngest } from "./../inngest/client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  ClerkProvider,
  SignInButton,
  SignedIn, 
  SignedOut, 
  UserButton,
} from '@clerk/nextjs';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const inter = Inter({ subsets: ["latin"] });

import { ReactNode } from "react";

export default function RootLayout() {
  const [promptValue, setPromptValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const {user} = useUser();
  const [showEmail, setShowEmail] = useState(false)

  const createInbox = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("clicked")
    if (user) {
      setShowEmail(true)
      try {
        await inngest.send({
          name: "myfunc/create-inbox",
          data: {
            name: nameValue,
            prompt: promptValue,
            send_to: user.primaryEmailAddress?.emailAddress
          }
        });
      } catch(error) {
        console.error("Error:", error)
      }
    }
  }

  const changeShowEmail = async (event: {preventDefault: () => void;}) => {
    event.preventDefault();
    
  }

  return (
    <ClerkProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <br/>

          <h2>Create inbox</h2>
          
          <p className="leading-7 [&:not(:first-child)]:mt-6">Setup an inbox to process incoming emails</p>
          
          <Label>Name</Label> 
          <Input placeholder="e.g. Investment newsletters inbox" value={nameValue} onChange={(e) => setNameValue(e.target.value)}/>

          <br/>

          <Label htmlFor="prompt">Extract command (prompt)</Label>
          <Textarea id="prompt" value={promptValue} onChange={(e) => setPromptValue(e.target.value)}/>
          <br/>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            This is the AI prompt that will be used to extract information from the incoming emails
          </p>
          <br/>
          <button onClick={createInbox} className="bg-orange-500 hover:bg-orange-600">Create inbox</button>
          {showEmail && <p>Forward emails to:</p>}
      </main>
    </ClerkProvider>
  );
}
