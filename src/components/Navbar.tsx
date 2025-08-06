"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuthStore } from "@/stores/auth";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#001a3a] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">Tickly</Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/event" className="hover:underline">
            Explore Event
          </Link>

          {user ? (
            <>
              <Link href="/user/profile" className="hover:underline">
                Profile
              </Link>
              <Button variant="destructive" onClick={clearAuth}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/user/register" className="hover:underline">
                Register
              </Link>
              <Link href="/user/login" className="hover:underline">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden text-sm font-medium">
          <Link href="/event" className="hover:underline" onClick={() => setIsOpen(false)}>
            Explore Event
          </Link>

          {user ? (
            <>
              <Link href="/user/profile" className="hover:underline" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/user/register" className="hover:underline" onClick={() => setIsOpen(false)}>
                Register
              </Link>
              <Link href="/user/login" className="hover:underline" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
