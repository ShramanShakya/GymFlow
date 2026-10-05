"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Dumbbell, LayoutDashboard, Users, UserRound, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Members", href: "/members", icon: Users },
  { name: "Trainers", href: "/trainers", icon: UserRound },
  { name: "Classes", href: "/classes", icon: CalendarDays },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname.startsWith("/members")) return "Members Management";
    if (pathname.startsWith("/trainers")) return "Trainer Directory";
    if (pathname.startsWith("/classes")) return "Class Schedule";
    return "GymFlow";
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-6 md:pl-70">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger button */}
          <button
            type="button"
            className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-base font-semibold text-zinc-900 sm:text-lg">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right action area */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-100 px-2.5 py-1.5 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline">System Active</span>
            <span className="sm:hidden">Active</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-medium text-xs">
            AD
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex w-64 max-w-xs flex-col bg-zinc-900 p-4 text-white shadow-xl z-10">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <Dumbbell className="h-4 w-4" />
                </div>
                <span className="font-bold">GymFlow</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-1 text-zinc-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-4 space-y-1">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        isActive ? "text-emerald-500" : "text-zinc-400"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
