"use client"

import { useState } from "react"
import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 flex justify-center">
        <Card className="border-white/10 bg-zinc-900/60 p-6 w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          {!done ? (
            <div className="grid gap-3">
              <Input type="password" placeholder="New password" />
              <Input type="password" placeholder="Confirm password" />
              <Button onClick={()=>setDone(true)}>Set Password</Button>
            </div>
          ) : (
            <p className="text-green-400">Password updated (demo).</p>
          )}
        </Card>
      </main>
    </div>
  )
}


