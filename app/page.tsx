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
import { Home } from "./layout";


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default function App() {
  return (
    <ClerkProvider>
      <Home />
    </ClerkProvider>
  );
}
