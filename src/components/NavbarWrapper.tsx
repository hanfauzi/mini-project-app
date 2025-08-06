"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isOrganizerPage = pathname.startsWith("/organizer");

  // ❗ Jangan tampilkan navbar di halaman organizer
  if (isOrganizerPage) return null;

  return <Navbar />;
}
