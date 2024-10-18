"use client"; // Ensure this is a client-side component

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })} // Sign out and redirect to the home page
      className="text-red-500 hover:text-red-700"
    >
      Log Out
    </button>
  );
}
