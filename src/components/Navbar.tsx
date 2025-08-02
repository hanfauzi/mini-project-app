"use client"
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-[#001a3a] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">Tickly</Link>
        </div>


        {/* Menu */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/organizer/create-event" className="hover:underline">
            Create Event
          </Link>
          <Link href="/explore" className="hover:underline">
            Explore Event
          </Link>
          <Link href="/user/register" className="hover:underline">
            Register
          </Link>
          <Link href="/user/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar