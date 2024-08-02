"use client";
import {
  ClerkProvider,
} from '@clerk/nextjs';
import './globals.css';
import React, { useState } from 'react';
import Home from "./layout";

const clerk_pub_key = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default function App() {
  return (
    <ClerkProvider>
      <Home/>
    </ClerkProvider>
  );
}
