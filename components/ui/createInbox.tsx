"use client";
import { inngest } from "../inngest/client";
import "../app/globals.css";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default function CreateInbox() {
  const [promptValue, setPromptValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [showEmail, setShowEmail] = useState(false)
  const { isLoaded, user } = useUser()

  const createInbox = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("clicked")
    if (user) {
      if (!(~isLoaded) && user.primaryEmailAddress) {
        setShowEmail(true)
        try {
          await inngest.send({
            name: "myfunc/create-inbox",
            data: {
              name: nameValue,
              prompt: promptValue,
              send_to: user.primaryEmailAddress.emailAddress
            }
          });
        } catch(error) {
          console.error("Error:", error)
        }
      }
    }
  }

  const changeShowEmail = async (event: {preventDefault: () => void;}) => {
    event.preventDefault();
    
  }

  return (
    <>
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
      {showEmail && <p>Forward emails to: 460d6ee3760a17630822+{}@cloudmailin.net</p>}
    </>
  );
}
