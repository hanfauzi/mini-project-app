"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuthStore } from "@/stores/auth";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // pakai lucide-react untuk ikon

const Navbar = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#001a3a] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">Tickly</Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/organizer/create-event" className="hover:underline">
            Create Event
          </Link>
          <Link href="/event" className="hover:underline">
            Explore Event
          </Link>
          <Link href="/user/register" className="hover:underline">
            Register
          </Link>
          <Link href="/user/login" className="hover:underline">
            Login
          </Link>
          <Button variant="destructive" onClick={clearAuth}>
            Logout
          </Button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden text-sm font-medium">
          <Link href="/organizer/create-event" className="hover:underline" onClick={() => setIsOpen(false)}>
            Create Event
          </Link>
          <Link href="/event" className="hover:underline" onClick={() => setIsOpen(false)}>
            Explore Event
          </Link>
          <Link href="/user/register" className="hover:underline" onClick={() => setIsOpen(false)}>
            Register
          </Link>
          <Link href="/user/login" className="hover:underline" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Button variant="destructive" onClick={() => { clearAuth(); setIsOpen(false); }}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
