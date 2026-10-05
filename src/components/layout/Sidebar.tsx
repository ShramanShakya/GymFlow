"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, LayoutDashboard, Users, UserRound, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Members", href: "/members", icon: Users },
  { name: "Trainers", href: "/trainers", icon: UserRound },
  { name: "Classes", href: "/classes", icon: CalendarDays },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-zinc-900 border-r border-zinc-800 text-zinc-300">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 h-16 px-6 border-b border-zinc-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <Dumbbell className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-base tracking-tight">GymFlow</span>
          <span className="text-[11px] text-zinc-400">Gym Management</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-3 py-4">
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
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive
                    ? "text-emerald-500"
                    : "text-zinc-400 group-hover:text-zinc-200"
                )}
              />
              {item.name}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* University Project Footer info */}
      <div className="p-4 border-t border-zinc-800 text-xs text-zinc-500">
        <p className="font-medium text-zinc-400">GymFlow v1.0</p>
        <p className="text-[11px]">University Software Project</p>
      </div>
    </aside>
  );
}
