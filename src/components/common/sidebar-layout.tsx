"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth-store"

type Role = "admin" | "agency" | "employee" | "user"

const NAV: Record<Role, Array<{ href: string; label: string }>> = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/agencies", label: "Agencies" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/employees", label: "Employees" },
    { href: "/admin/financial", label: "Financial" },
    { href: "/admin/ticket-reports", label: "Ticket Reports" },
    { href: "/admin/settings", label: "Settings" },
    { href: "/admin/notifications", label: "Notifications" },
  ],
  agency: [
    { href: "/agency/dashboard", label: "Dashboard" },
    { href: "/agency/events", label: "My Events" },
    { href: "/agency/tickets", label: "Tickets" },
    { href: "/agency/employees", label: "Employees" },
    { href: "/agency/reports", label: "Reports" },
    { href: "/agency/settings", label: "Settings" },
    { href: "/agency/notifications", label: "Notifications" },
  ],
  employee: [
    { href: "/employee/my-events", label: "My Events" },
    { href: "/employee/profile", label: "Profile" },
  ],
  user: [
    { href: "/user/dashboard", label: "Dashboard" },
    { href: "/user/my-tickets", label: "My Tickets" },
    { href: "/user/favorites", label: "Favorites" },
    { href: "/user/wallet", label: "Wallet" },
    { href: "/user/notifications", label: "Notifications" },
    { href: "/user/support", label: "Support" },
    { href: "/user/profile", label: "Profile" },
  ],
}

export function SidebarLayout({ role, title, children }: { role: Role; title?: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
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
        <div className="p-2 mt-4">
          <button
            onClick={() => {
              const { logout } = useAuthStore.getState()
              logout()
              router.push("/")
            }}
            className="w-full text-left rounded-md px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>
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


