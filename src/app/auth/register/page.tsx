"use client"

import { useState } from "react"
import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AuthRegisterPage() {
  const [tab, setTab] = useState<"user" | "agency">("user")
  const [saved, setSaved] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 flex justify-center">
        <Card className="border-white/10 bg-zinc-900/60 p-6 w-full max-w-xl space-y-4">
          <h1 className="text-2xl font-bold text-white">Register</h1>
          <div className="flex gap-2">
            <Button variant={tab === "user" ? "default" : "outline"} className={tab === "user" ? "" : "border-white/20"} onClick={()=>setTab("user")}>As User</Button>
            <Button variant={tab === "agency" ? "default" : "outline"} className={tab === "agency" ? "" : "border-white/20"} onClick={()=>setTab("agency")}>As Agency</Button>
          </div>

          {tab === "user" && (
            <div className="grid gap-3">
              <Input placeholder="Name" />
              <Input placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Button onClick={()=>setSaved(true)}>Create Account</Button>
            </div>
          )}
          {tab === "agency" && (
            <div className="grid gap-3">
              <Input placeholder="Company Name" />
              <Input placeholder="Contact Email" />
              <Input placeholder="Tax ID" />
              <Button onClick={()=>setSaved(true)}>Create Agency Account</Button>
            </div>
          )}
          {saved && <p className="text-green-400 text-sm">Registration submitted (demo).</p>}
        </Card>
      </main>
    </div>
  )
}


