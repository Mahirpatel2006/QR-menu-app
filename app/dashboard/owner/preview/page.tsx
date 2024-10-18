"use client"; 

import { SessionProvider } from "next-auth/react"; 
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between max-w-6xl mx-auto">
              <Link href="/" className="text-lg font-bold">
                QR Menu Platform
              </Link>
              <AuthStatus />
            </nav>
          </header>
          <main>{children}</main>
          <footer className="bg-gray-800 text-white text-center py-4">
            <p>© 2024 QR Menu Platform</p>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}

function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {session?.user ? (
        <>
          <span className="mr-4">Hello, {session.user.name}</span>
          <LogoutButton />
        </>
      ) : (
        <Link href="/auth/signin" className="mr-4">
          Sign In
        </Link>
      )}
    </div>
  );
}
