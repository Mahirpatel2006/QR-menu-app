"use client";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from 'next-auth/react';
// import LogoutButton from "@/components/LogoutButton";
import { motion } from 'framer-motion';
import "./globals.css";
import { usePathname } from 'next/navigation'; // Import usePathname

export default function RootLayout({ children }:any) {
  const pathname = usePathname(); // Get the current path

  // Check if the current page is MenuPage based on the path
  const isMenuPage = pathname.includes("/menu");

  return (
    <html lang="en">
      <body className="bg-[#1a1d23] text-[#333333]">
        <SessionProvider>
          {/* Conditionally render the navbar only if it's not the MenuPage */}
          {!isMenuPage && (
            <motion.header
              className="bg-[#2f343a] text-white p-4 shadow-lg"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <nav className="flex justify-between max-w-6xl mx-auto">
                <Link href="/" className="text-lg font-bold hover:text-[#66d9ef] transition">
                  QR Menu Platform
                </Link>
                <AuthStatus />
              </nav>
            </motion.header>
          )}

          <main className="flex-1">{children}</main>

          <footer className="bg-[#2f343a] text-[#ccd6f6] text-center py-4">
            <p> 2024 QR Menu Platform</p>
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
          <button
      onClick={() => signOut({ callbackUrl: '/' })} // Sign out and redirect to the home page
      className="text-red-500 hover:text-red-700"
    >
      Log Out
    </button>
        </>
      ) : (
        <Link href="/auth/signin" className="mr-4 hover:text-[#66d9ef] transition">
          Sign In
        </Link>
      )}
    </div>
  );
}
