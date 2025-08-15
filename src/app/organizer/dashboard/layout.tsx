"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  Gift,
  User,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth"; 

type MenuChild = { label: string; href: string };
type MenuItem = {
  label: string;
  href?: string;
  icon?: React.ElementType;
  children?: MenuChild[];
  onClick?: () => void; 
};

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [openEvents, setOpenEvents] = useState<boolean>(() =>
    pathname?.startsWith("/organizer/dashboard/events") ||
    pathname?.startsWith("/organizer/dashboard/create-event")
  );

  const isActive = (href?: string) => (href ? pathname === href : false);
  const isChildActive = (hrefs: string[]) => hrefs.some((h) => pathname?.startsWith(h));

  const MENU: MenuItem[] = [
    { label: "Dashboard", href: "/organizer/dashboard", icon: LayoutDashboard },
    {
      label: "Events",
      icon: CalendarDays,
      children: [
        { label: "My Events", href: "/organizer/dashboard/events" },
        { label: "Create Event", href: "/organizer/dashboard/create-event" },
      ],
    },
    { label: "Transactions", href: "/organizer/dashboard/transactions", icon: CreditCard },
    { label: "Vouchers", href: "/organizer/dashboard/vouchers", icon: Gift },
    { label: "Profile", href: "/organizer/dashboard/profile", icon: User },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => {
        clearAuth();
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#001a3a]">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">

        <aside className="bg-white border-r md:min-h-screen md:sticky md:top-0">
          <div className="px-5 py-4 border-b">
            <div className="font-extrabold text-xl tracking-tight text-blue-700">TICKLY</div>
          </div>

          <nav className="p-3">
            <ul className="space-y-1">
              {MENU.map((item) => {
                const Icon = item.icon;

                if (item.children?.length) {
                  const activeParent = isChildActive(item.children.map((c) => c.href));
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => setOpenEvents((v) => !v)}
                        className={[
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          activeParent
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "text-[#001a3a] hover:bg-[#f1f5ff] hover:text-blue-700",
                        ].join(" ")}
                        aria-expanded={openEvents}
                        aria-controls="menu-events"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${openEvents ? "rotate-90" : ""}`}
                        />
                      </button>

                      {openEvents && (
                        <ul id="menu-events" className="mt-1 ml-9 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={[
                                  "block text-[13px] px-3 py-1.5 rounded-md transition-colors border",
                                  isActive(child.href)
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "text-[#335071] border-transparent hover:bg-[#f1f5ff] hover:text-blue-700",
                                ].join(" ")}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                if (item.onClick) {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={item.onClick}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors border text-[#001a3a] border-transparent hover:bg-[#f1f5ff] hover:text-blue-700"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.label}
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href!}
                      className={[
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors border",
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "text-[#001a3a] border-transparent hover:bg-[#f1f5ff] hover:text-blue-700",
                      ].join(" ")}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="p-4 sm:p-6">
          <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
