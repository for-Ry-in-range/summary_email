"use client";
import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignInButton,
  SignedIn, 
  SignedOut, 
  UserButton,
} from '@clerk/nextjs';
import './globals.css';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import RootLayout from "./layout";

const clerk_pub_key = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default function App() {
  return (
    <ClerkProvider publishableKey={clerk_pub_key}>
      <RootLayout/>
    </ClerkProvider>
  );
}
