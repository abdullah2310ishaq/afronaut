"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type Role = "admin" | "agency" | "employee" | "user"

const NAV: Record<Role, Array<{ href: string; label: string }>> = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/agencies", label: "Agencies" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/financial", label: "Financial" },
    { href: "/admin/ticket-reports", label: "Ticket Reports" },
    { href: "/admin/settings", label: "Settings" },
  ],
  agency: [
    { href: "/agency/dashboard", label: "Dashboard" },
    { href: "/agency/events", label: "My Events" },
    { href: "/agency/event-builder", label: "Event Builder" },
    { href: "/agency/employees", label: "Employees" },
    { href: "/agency/statistics", label: "Statistics" },
  ],
  employee: [
    { href: "/employee/my-events", label: "My Events" },
    { href: "/employee/scanner/evt-001", label: "Scanner" },
  ],
  user: [
    { href: "/dashboard/user", label: "Dashboard" },
    { href: "/user/my-tickets", label: "My Tickets" },
    { href: "/user/favorites", label: "Favorites" },
    { href: "/user/profile", label: "Profile" },
  ],
}

export function SidebarLayout({ role, title, children }: { role: Role; title?: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const items = NAV[role]

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block border-r border-white/10 bg-zinc-950/80">
        <div className="p-4 text-white font-bold text-lg">Afronaut</div>
        <nav className="p-2 space-y-1">
          {items.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href} className={cn("block rounded-md px-3 py-2 text-sm", active ? "bg-primary/20 text-primary border border-primary/30" : "text-zinc-400 hover:text-white hover:bg-white/5")}>{item.label}</Link>
            )
          })}
        </nav>
      </aside>
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-white/10 bg-zinc-950/60 backdrop-blur">
          <div className="container px-4 py-4">
            <h1 className="text-xl font-semibold text-white">{title}</h1>
          </div>
        </header>
        <main className="container px-4 py-6 flex-1">{children}</main>
      </div>
    </div>
  )
}


