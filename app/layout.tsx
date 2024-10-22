"use client";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "@/Components/LogoutButton";
import { motion } from 'framer-motion';
import "./globals.css";
import { usePathname } from 'next/navigation'; // Import usePathname
import { relative } from "path";

export default function RootLayout({ children }) {
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
              <Link href="/" className="text-lg font-bold hover:text-[#66d9ef] transition" style={{ height: '40px' }}>
  <img src="/cp3.png" alt="" style={{ height: '70px' ,position:"relative", bottom:"15px"}} /> {/* Adjust the height here */}
</Link>

                <AuthStatus />
              </nav>
            </motion.header>
          )}

          <main className="flex-1">{children}</main>

          <footer className="bg-[#2f343a] text-[#ccd6f6] text-center py-4">
            <p> 2024 Click2Menu</p>
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
        <Link href="/auth/signin" className="mr-4 hover:text-[#66d9ef] transition">
          Sign In
        </Link>
      )}
    </div>
  );
}
