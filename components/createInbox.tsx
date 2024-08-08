"use client";
import { inngest } from "../inngest/client";
import "../src/app/globals.css";
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
  const [nameEmail, setNameEmail] = useState([])
  const { isLoaded, user } = useUser()

  const createInbox = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (user) {
      if (~isLoaded && user.primaryEmailAddress) {
        try {
          console.log("BEFORE INNGEST FUNCTION")
          await inngest.send({
            name: "myfunc/create-inbox",
            data: {
              name: nameValue,
              prompt: promptValue,
              send_to: user.primaryEmailAddress.emailAddress
            }
          });
          const result = await fetch('http://localhost:3000/api/get_inboxes')
          const data = await result.json()
          console.log(data)
          //setNameEmail(result)
        } catch(error) {
          console.error("Error:", error)
        }
      }
    }
  }

  //setNameEmail(await fetch('localhost:3000/get_inboxes'))

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
      <p>Email addresses for your inbox(es):</p>
      <ul>
        {nameEmail.map((name) => (
          <li>{name[0]}: {name[1]}</li>
        ))}
      </ul>
    </>
  );
}
