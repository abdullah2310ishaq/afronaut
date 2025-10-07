"use client"

import { ReactNode } from "react"
import { Header } from "@/components/common/header"

interface AuthLayoutProps {
  children: ReactNode
  showHeader?: boolean
}

export function AuthLayout({ children, showHeader = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background">
      {showHeader && <Header />}
      <main className="container px-4 py-10 flex justify-center items-start md:items-center">
        {children}
      </main>
    </div>
  )
}


