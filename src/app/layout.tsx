import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn, 
  SignedOut, 
  UserButton,
} from '@clerk/nextjs';
import CreateInbox from "@/components/createInbox";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const inter = Inter({ subsets: ["latin"] });

import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode; // Make children optional
}) {
  return (
    <html>
      <body>
        <ClerkProvider>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>

              <CreateInbox/>
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}