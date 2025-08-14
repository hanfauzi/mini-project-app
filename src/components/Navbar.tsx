"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useAuthStore } from "@/stores/auth";

function NavItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = useMemo(() => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(href + "/");
  }, [pathname, href]);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "inline-flex items-center h-10 px-2 rounded-md transition-colors",
        "text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        active ? "bg-white/10 text-white" : "text-white/90 hover:text-white hover:bg-white/5",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const [isOpen, setIsOpen] = useState(false);

  const closeMobile = () => setIsOpen(false);

  return (
    <header className="bg-[#001a3a] text-white shadow-md">
      <nav
        className="mx-auto max-w-6xl px-4 py-3 md:py-4"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md px-1"
              aria-label="TICKLY Home"
            >
              TICKLY
            </Link>
          </div>


          <div className="hidden md:flex items-center gap-6">
            <NavItem href="/event" label="Explore Event" />

            {user ? (
              <>
                <NavItem href="/user/profile" label="Profile" />
                <NavItem href="/user/transactions" label="My Transaction" />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearAuth}
                  className="h-9"
                  aria-label="Logout"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavItem href="/user/register" label="Register" />
                <NavItem href="/user/login" label="Login" />
              </>
            )}
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            onClick={() => setIsOpen((v) => !v)}
            aria-controls="mobile-nav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div
            id="mobile-nav"
            className="md:hidden mt-3 border-t border-white/10 pt-3"
          >
            <div className="flex flex-col gap-2">
              <NavItem href="/event" label="Explore Event" onClick={closeMobile} />

              {user ? (
                <>
                  <NavItem href="/user/profile" label="Profile" onClick={closeMobile} />
                  <NavItem href="/user/transactions" label="My Transaction" onClick={closeMobile} />
                  <Button
                    variant="destructive"
                    onClick={() => {
                      clearAuth();
                      closeMobile();
                    }}
                    className="mt-1"
                    aria-label="Logout"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavItem href="/user/register" label="Register" onClick={closeMobile} />
                  <NavItem href="/user/login" label="Login" onClick={closeMobile} />
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
